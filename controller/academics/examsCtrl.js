const AsyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

const Exam = require("../../model/Academic/Exam");
const Teacher = require("../../model/Staff/Teacher");
const Subject = require("../../model/Academic/Subject");
const Program = require("../../model/Academic/Program");
const AcademicYear = require("../../model/Academic/AcademicYear");
const ClassLevel = require("../../model/Academic/ClassLevel");
const AcademicTerm = require("../../model/Academic/AcademicTerm");
const Question = require("../../model/Academic/Questions");
const Category = require("../../model/Academic/Categories");
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

    res.render("exam/createExam", {
      programs,
      academicTerms,
      academicYears,
      classLevels,
      subjects,
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
  } = req.body;
  // Find teacher
  const teacherFound = await Teacher.findById(req.userAuth?._id);
  if (!teacherFound) {
    throw new Error("Teacher not found");
  }

  // Check if exam already exists
  const examExists = await Exam.findOne({ name });
  if (examExists) {
    throw new Error("Exam already exists");
  }
  // Validate program object ID
  const programExists = await Program.findById(program);
  if (!programExists) {
    throw new Error("Invalid program");
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
    createdBy: req.userAuth?._id,
  });

  // Push the exam into teacher
  teacherFound.examsCreated.push(examCreated._id);

  // Save exam and teacher
  await examCreated.save();
  await teacherFound.save();
  res.status(201).json({
    status: "success",
    message: "Exam created",
    data: examCreated,
  });
});

//@desc  get all Exams
//@route GET /api/v1/exams
//@acess  Private

exports.getExams = AsyncHandler(async (req, res) => {
  const exams = await Exam.find()
    .populate("academicYear", "name")
    .populate("academicTerm", "name")
    .populate("classLevel", "name")
    .populate("examType", "name")
    .populate("subject", "name")
    .populate("program", "name");
  res.render("exam/index", { exams: exams, loggedIn: res.locals.loggedIn });
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
  res.render("exam/exam", {
    title: "exam",
    exam: exam,
    loggedIn: res.locals.loggedIn,
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

    console.log("Search Query:", searchQuery);
    console.log("Search Results:", exams);

    res.render("exam/index", {
      title: "exam",
      exams: exams,
    });
  } catch (error) {
    // Handle any other errors that may occur during the search
    console.error(error);
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
  if (existingExam) {
    throw new Error("Exam name already exists");
  }

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

  res.render("exam/updateExam", {
    title: "Update Exam",
    exam: examUpdated,
  });
});

// Controller function for rendering the add question page
exports.renderAddQuestionPage = async (req, res) => {
  try {
    const { examId } = req.params;
    const exam = await Exam.findById(examId);
    res.render("exam/add-question", { exam });
  } catch (error) {
    console.error("Error rendering add question page:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Controller function for adding a question to an exam
exports.addQuestionToExam = async (req, res) => {
  try {
    const { examId } = req.params;
    const { question, optionA, optionB, optionC, optionD, correctAnswer } =
      req.body;

    const newQuestion = new Question({
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAnswer,
      exam: examId,
    });

    await newQuestion.save();

    const exam = await Exam.findById(examId);
    exam.questions.push(newQuestion);
    await exam.save();

    res.redirect(`/exam/${examId}`);
  } catch (error) {
    console.error("Error adding question to exam:", error);
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

    res.render("exam/attach-question", {
      exam,
      categories: categorizedQuestions,
      currentPage: page,
      totalPages,
      previousPage,
      nextPage,
      paginationNumbers,
      searchQuery,
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
  res.render("exam/create-exam", {
    categories: categories,
    subjects,
    programs,
    academicYears,
    academicTerms,
    classLevels,
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
  console.log(teacherId);

  try {
    // Now we find the teacher
    const teacher = await Teacher.findOne({});
    console.log(teacher);
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

    res.status(201).json({
      status: "success",
      message: "Exam created",
      data: exam,
    });
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
    throw new Error("Not enough questions to create exam");
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
  console.log(teacher);
  teacher.examsCreated.push(exam._id);
  await teacher.save();

  return exam;
}
