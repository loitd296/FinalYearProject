const AsyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const { JSDOM } = require("jsdom");
const { asBlob } = require("html-docx-js");

const Exam = require("../../model/Academic/Exam");
const Teacher = require("../../model/Staff/Teacher");
const Subject = require("../../model/Academic/Subject");
const Program = require("../../model/Academic/Program");
const AcademicYear = require("../../model/Academic/AcademicYear");
const ClassLevel = require("../../model/Academic/ClassLevel");
const AcademicTerm = require("../../model/Academic/AcademicTerm");
const Question = require("../../model/Academic/Questions");
const Category = require("../../model/Academic/Categories");
const { calculatePageRange } = require("../../utils/paginationUtils");
//@desc  Create Exam
//@route POST /api/v1/exams
//@acess Private  Teachers only

exports.rendercreateExam = async (req, res) => {
  try {
    // Fetch programs, academic terms, academic years, class levels, and subjects from the database
    const programs = await Program.find();
    const academicTerms = await AcademicTerm.find();
    const academicYears = await AcademicYear.find();
    const classLevels = await ClassLevel.find();
    const subjects = await Subject.find();
    const teacher = await Teacher.findById(req.userAuth._id);

    res.render("exam/createExam", {
      programs,
      academicTerms,
      academicYears,
      classLevels,
      subjects,
      teacher: teacher.role,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

exports.createExam = AsyncHandler(async (req, res) => {
  const {
    name,
    description,
    subject,
    program,
    academicTerm,
    duration,
    examDate,
    examTime,
    examType,
    createdBy,
    academicYear,
    classLevel,
    accessKey,
  } = req.body;
  // Find teacher
  const teacherFound = await Teacher.findById(req.userAuth?._id);
  if (!teacherFound) {
    throw new Error("Teacher not found");
  }

  // Check if exam already exists
  const examExists = await Exam.findOne({ name });
  if (examExists) {
    return res.status(400).json({ error: "Exam already exists" });
  }
  // Validate program object ID
  const programExists = await Program.findById(program);
  if (!programExists) {
    return res.status(400).json({ error: "Invalid program" });
  }

  // Create exam
  const examCreated = new Exam({
    name,
    description,
    subject,
    program: programExists._id,
    academicTerm,
    duration,
    academicYear,
    classLevel,
    createdBy,
    examDate,
    examTime,
    examType,
    accessKey,
    createdBy: req.userAuth?._id,
  });

  // Push the exam into teacher
  teacherFound.examsCreated.push(examCreated._id);

  // Save exam and teacher
  await examCreated.save();
  await teacherFound.save();
  res.redirect("/exam/index");
});

//@desc  get all Exams
//@route GET /api/v1/exams
//@acess  Private

exports.getExams = AsyncHandler(async (req, res) => {
  const { search, page } = req.query;
  const limit = 10; // Number of categories to show per page
  const currentPage = parseInt(page) || 1;

  // Build the query based on the search term and teacher ID
  const query = { createdBy: req.userAuth._id }; // Assuming createdBy field stores the teacher's ID

  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  // Count the total number of exams matching the search filter and teacher ID
  const totalExam = await Exam.countDocuments(query);

  // Calculate the total number of pages based on the limit
  const totalPages = Math.ceil(totalExam / limit);

  // Calculate the range of page numbers to display
  const range = 5;
  const { startPage, endPage } = calculatePageRange(
    currentPage,
    totalPages,
    range
  );

  // Retrieve exams created by the teacher
  const exams = await Exam.find(query)
    .populate("academicYear", "name")
    .populate("academicTerm", "name")
    .populate("classLevel", "name")
    .populate("examType", "name")
    .populate("subject", "name")
    .populate("program", "name")
    .skip((currentPage - 1) * limit)
    .limit(limit);

  // Fetch teacher details
  const teacher = await Teacher.findById(req.userAuth._id);

  res.render("exam/index", {
    exams: exams,
    search,
    currentPage,
    totalPages,
    currentPageEntries: exams.length,
    totalEntries: totalExam,
    hasPreviousPage: currentPage > 1,
    previousPage: currentPage - 1,
    hasNextPage: currentPage < totalPages,
    nextPage: currentPage + 1,
    pages: Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    ),
    loggedIn: res.locals.loggedIn,
    teacher: teacher.role,
  });
});

//@desc  get single exam
//@route GET /api/v1/exams/:id
//@acess  Private Teahers only

exports.getExam = AsyncHandler(async (req, res) => {
  const exam = await Exam.findById(req.params.id)
    .populate("academicYear", "name")
    .populate("academicTerm", "name")
    .populate("classLevel", "name")
    .populate("examType", "name")
    .populate("subject", "name")
    .populate("program", "name");
  const teacher = await Teacher.findById(req.userAuth._id);

  res.render("exam/exam", {
    title: "exam",
    exam: exam,
    loggedIn: res.locals.loggedIn,
    teacher: teacher.role,
  });
});

exports.searchExams = AsyncHandler(async (req, res) => {
  try {
    const searchQuery = req.query.search;
    const exams = await Exam.find({
      name: { $regex: searchQuery, $options: "i" },
    })
      .populate("academicYear", "name")
      .populate("academicTerm", "name")
      .populate("classLevel", "name")
      .populate("examType", "name")
      .populate("subject", "name")
      .populate("program", "name");

    res.render("exam/index", {
      title: "exam",
      exams: exams,
    });
  } catch (error) {
    // Handle any other errors that may occur during the search
    res
      .status(500)
      .json({ status: "failed", message: "Failed to search exams" });
  }
});

//@desc   Update  Exam
//@route  PUT /api/v1/exams/:id
//@acess  Private  - Teacher only
exports.renderUpdateExam = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id)
      .populate("subject")
      .populate("program")
      .populate("academicTerm")
      .populate("academicYear")
      .populate("classLevel");

    const subjects = await Subject.find();
    const programs = await Program.find();
    const academicTerms = await AcademicTerm.find();
    const academicYears = await AcademicYear.find();
    const classLevels = await ClassLevel.find();

    res.render("exam/updateExam", {
      title: "Update Exam",
      exam,
      subjects,
      programs,
      academicTerms,
      academicYears,
      classLevels,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

exports.updateExam = AsyncHandler(async (req, res) => {
  const {
    name,
    description,
    subject,
    program,
    academicTerm,
    duration,
    examDate,
    examTime,
    examType,
    createdBy,
    academicYear,
    classLevel,
  } = req.body;

  // Fetch the existing exam
  const examFound = await Exam.findById(req.params.id);
  if (!examFound) {
    throw new Error("Exam not found");
  }

  // Check if the name already exists for another exam
  const existingExam = await Exam.findOne({
    name,
    _id: { $ne: examFound._id },
  });

  // Update the exam
  examFound.name = name;
  examFound.description = description;
  examFound.subject = subject;
  examFound.program = program;
  examFound.academicTerm = academicTerm;
  examFound.duration = duration;
  examFound.examDate = examDate;
  examFound.examTime = examTime;
  examFound.examType = examType;
  examFound.createdBy = createdBy;
  examFound.academicYear = academicYear;
  examFound.classLevel = classLevel;
  examFound.createdBy = req.userAuth._id;

  // Save the updated exam
  const examUpdated = await examFound.save();

  res.redirect("/exam/index");
});

exports.updateQuestionExam = async (req, res) => {
  try {
    const examId = req.params.id;

    // Fetch the exam along with its questions
    const exam = await Exam.findById(examId).populate("questions");

    if (!exam) {
      return res.status(404).send("Exam not found");
    }

    if (req.method === "POST") {
      const questionId = req.params.questionId;
      const questionData = req.body;

      // Find the question by ID within the exam's questions
      const questionToUpdate = exam.questions.find(
        (q) => q._id.toString() === questionId
      );

      if (!questionToUpdate) {
        return res.status(404).send("Question not found");
      }
      // Update the question's properties with data from the request
      questionToUpdate.question = questionData.question;
      questionToUpdate.optionA = questionData.optionA;
      questionToUpdate.optionB = questionData.optionB;
      questionToUpdate.optionC = questionData.optionC;
      questionToUpdate.optionD = questionData.optionD;
      questionToUpdate.correctAnswer = questionData.correctAnswer;
      questionToUpdate.difficulty = questionData.difficulty;
      questionToUpdate.category = questionData.category;

      // Save the updated question within the exam's questions array
      await questionToUpdate.save();
      await exam.save();

      // Redirect back to the exam edit page
      return res.redirect(`/exam/${examId}/edit-question`);
    }
    const teacher = await Teacher.findById(req.userAuth._id);

    // Render the edit questions form with all questions
    res.render("exam/exam-edit-question", {
      exam,
      teacher: teacher.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Controller function to delete a question
exports.deleteQuestionExam = AsyncHandler(async (req, res) => {
  try {
    const { questionId } = req.params;
    const examId = req.params.id;

    const exam = await Exam.findById(examId).populate("questions");

    exam.questions.pull(questionId);
    await exam.save();

    res.redirect(`/exam/${examId}/edit-question`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

exports.deleteExam = AsyncHandler(async (req, res) => {
  await Exam.findByIdAndDelete(req.params.id);
  res.redirect("/exam/index"); // Redirect to the list or any other desired page
});

// Controller function for rendering the add question page
exports.renderAddQuestionPage = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    const categories = await Category.find();
    const teacher = await Teacher.findById(req.userAuth._id);
    res.render("exam/add-question", {
      exam,
      teacher: teacher.role,
      categories,
    });
  } catch (error) {
    console.error("Error rendering add question page:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Controller function for adding a question to an exam
exports.addQuestionToExam = async (req, res) => {
  try {
    const {
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAnswer,
      category,
      difficulty,
    } = req.body;

    // Create a new question using the Question model
    const newQuestion = new Question({
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAnswer,
      category,
      difficulty,
      createdBy: req.userAuth._id,
    });

    // Save the new question to the database
    await newQuestion.save();

    // Find the exam by its ID
    const exam = await Exam.findById(req.params.id);

    // Push the new question into the exam's questions array
    exam.questions.push(newQuestion);

    // Save the updated exam with the new question attached
    await exam.save();

    // Redirect to the exam index page after adding the question
    res.redirect("/exam/index");
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.renderAddQuestionForm = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = 6;
    const skip = (page - 1) * perPage;
    const searchQuery = req.query.search || "";

    // Get exam and categories
    const [exam, categories, totalCategories] = await Promise.all([
      Exam.findById(req.params.id),
      Category.find({ name: { $regex: searchQuery, $options: "i" } })
        .skip(skip)
        .limit(perPage),
      Category.countDocuments({ name: { $regex: searchQuery, $options: "i" } }),
    ]);

    // Fetch questions for each category with pagination
    const categorizedQuestions = await Promise.all(
      categories.map(async (category) => {
        const [questions, totalQuestions] = await Promise.all([
          Question.find({ category: category._id })
            .select("_id question category")
            .skip(skip)
            .limit(perPage),
          Question.countDocuments({ category: category._id }),
        ]);

        return {
          category,
          questions,
          totalQuestions,
          currentPage: page,
          hasMore: totalQuestions > perPage * page,
        };
      })
    );

    // Calculate total number of pages
    const totalPages = Math.ceil(totalCategories / perPage);

    // Pagination helpers
    const previousPage = page > 1 ? page - 1 : null;
    const nextPage = page < totalPages ? page + 1 : null;

    // Generating pagination numbers
    let paginationNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i == 1 || i == totalPages || (i >= page - 2 && i <= page + 2)) {
        paginationNumbers.push({
          number: i,
          isActive: i === page,
        });
      }
    }
    const teacher = await Teacher.findById(req.userAuth._id);

    res.render("exam/attach-question", {
      exam,
      categories: categorizedQuestions,
      currentPage: page,
      totalPages,
      previousPage,
      nextPage,
      paginationNumbers,
      searchQuery,
      teacher: teacher.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getMoreQuestions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = 6;
    const skip = (page - 1) * perPage;
    const categoryId = req.query.categoryId;

    const [questions, totalQuestions] = await Promise.all([
      Question.find({ category: categoryId })
        .select("_id question category")
        .skip(skip)
        .limit(perPage),
      Question.countDocuments({ category: categoryId }),
    ]);

    res.json({
      questions,
      hasMore: totalQuestions > perPage * page,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.attachQuestionToExam = async (req, res) => {
  try {
    const examId = req.params.id;
    const questionIds = req.body.questionIds;

    // Find the exam
    const exam = await Exam.findById(examId);

    // Check if exam exists
    if (!exam) {
      return res.status(404).send("Exam not found");
    }

    // Find and attach the questions to the exam
    const questions = await Question.find({ _id: { $in: questionIds } });

    if (!questions) {
      return res.status(404).send("Questions not found");
    }

    exam.questions.push(...questions);
    await exam.save();

    res.redirect(`/exam/${examId}/attach-question`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.createExamForm = async (req, res) => {
  const categories = await Category.find({});
  const subjects = await Subject.find();
  const programs = await Program.find();
  const academicTerms = await AcademicTerm.find();
  const academicYears = await AcademicYear.find();
  const classLevels = await ClassLevel.find();
  const teacher = await Teacher.findById(req.userAuth._id);

  res.render("exam/create-auto-exam", {
    categories: categories,
    subjects,
    programs,
    academicYears,
    academicTerms,
    classLevels,
    teacher: teacher.role,
  });
};

exports.createExamAuto = AsyncHandler(async (req, res) => {
  let categories = Array.isArray(req.body.categories)
    ? req.body.categories
    : [req.body.categories];
  categories = categories.map(
    (category) => new mongoose.Types.ObjectId(category)
  );

  const numQuestions = parseInt(req.body.numQuestions);
  const examDetails = req.body;
  const teacherId = req.userAuth?.id; // Just get the id, don't try to find it yet

  try {
    // Now we find the teacher
    const teacher = await Teacher.findOne({});
    // Check if the teacher was found
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    let exam = await createExamWithCategories(
      categories,
      numQuestions,
      examDetails,
      teacher._id // Pass teacher._id directly
    );

    res.redirect("/exam/index");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

async function createExamWithCategories(
  categories,
  numQuestions,
  examDetails,
  teacherId
) {
  const questions = await Question.aggregate([
    { $match: { category: { $in: categories } } },
    { $sample: { size: numQuestions } },
  ]);

  if (questions.length !== numQuestions) {
    return res
      .status(400)
      .json({ error: "Not enough questions to create exam" });
  }

  // Prepare exam details
  const examData = {
    ...examDetails,
    createdBy: teacherId,
    questions: questions.map((question) => question._id),
  };

  // Create new exam
  const exam = new Exam(examData);

  // Save the exam
  await exam.save();

  // Update the teacher's exams created
  const teacher = await Teacher.findById(teacherId);
  teacher.examsCreated.push(exam._id);
  await teacher.save();

  return exam;
}
exports.downloadWord = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id).populate("questions");
    const teacher = await Teacher.findById(req.userAuth?._id);

    if (!exam) {
      return res.status(404).send("Exam not found");
    }

    let htmlContent = `<h2>${exam.name}</h2>`;
    htmlContent += `<p>Description: ${teacher.name}</p>`;
    htmlContent += `<p>Description: ${exam.description}</p>`;
    htmlContent += "<h3>Questions:</h3>";

    exam.questions.forEach((question, index) => {
      htmlContent += `<p>${index + 1}. ${question.question}</p>`;
      htmlContent += `<p> ${question.optionA}</p>`;
      htmlContent += `<p> ${question.optionB}</p>`;
      htmlContent += `<p> ${question.optionC}</p>`;
      htmlContent += `<p> ${question.optionD}</p>`;
    });

    if (!htmlContent.trim()) {
      return res.status(500).send("Error: Empty HTML content");
    }

    const sanitizedFileName = sanitizeFileName(exam.name);

    // Convert the HTML content to a Word document as a Blob
    const docxBlob = asBlob(htmlContent);

    // Convert the Blob to a Buffer
    const docxBuffer = await new Response(docxBlob).arrayBuffer();

    // Set the response headers for download
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${sanitizedFileName}.docx`
    );
    res.contentType(
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );

    // Send the generated Word document as a Buffer
    res.end(Buffer.from(docxBuffer));
  } catch (err) {
    console.error("Error retrieving exam:", err);
    res.status(500).send("Error exporting to Word");
  }
};
function sanitizeFileName(name) {
  // Remove any characters that might cause issues in filenames
  return name.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g, "_");
}
