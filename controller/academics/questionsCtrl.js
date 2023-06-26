const AysncHandler = require("express-async-handler");
const Exam = require("../../model/Academic/Exam");
const Question = require("../../model/Academic/Questions");
const Category = require("../../model/Academic/Categories");
const { calculatePageRange } = require("../../utils/paginationUtils");

//@desc  Create Question
//@route POST /api/v1/questions/:examID
//@acess Private  Teachers only
// Render the select exam page
exports.renderSelectExam = async (req, res) => {
  try {
    const exams = await Exam.find();
    res.render("question/selectExam", { exams });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve exams" });
  }
};

// Render the create question page for the selected exam
exports.renderCreateQuestion = async (req, res) => {
  const examID = req.params.examID;

  try {
    const exam = await Exam.findById(examID);
    if (!exam) {
      throw new Error("Exam not found");
    }
    const categories = await Category.find();

    res.render("question/createQuestion", { exam, categories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a question for the selected exam
exports.createQuestion = AysncHandler(async (req, res) => {
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
  const examID = req.params.examID;

  try {
    const exam = await Exam.findById(examID);
    if (!exam) {
      throw new Error("Exam not found");
    }

    const questionExists = await Question.findOne({ question });
    if (questionExists) {
      throw new Error("Question already exists");
    }

    const createdQuestion = await Question.create({
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAnswer,
      difficulty,
      category,
      exam: examID,
      createdBy: req.userAuth._id,
    });

    exam.questions.push(createdQuestion._id);
    await exam.save();

    res.status(201).json({
      status: "success",
      message: "Question created",
      data: createdQuestion,
      category: categories,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//@desc  get all questions
//@route GET /api/v1/questions
//@acess  Private - Teacher only
exports.getQuestions = AysncHandler(async (req, res) => {
  try {
    const { search, page } = req.query;
    const limit = 10; // Number of categories to show per page
    const currentPage = parseInt(page) || 1;

    // Build the query based on the search term
    const query = {};
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // Count the total number of categories matching the search filter
    const totalQuestions = await Question.countDocuments(query);

    // Calculate the total number of pages based on the limit
    const totalPages = Math.ceil(totalQuestions / limit);

    // Calculate the range of page numbers to display
    const range = 5;
    const { startPage, endPage } = calculatePageRange(
      currentPage,
      totalPages,
      range
    );

    // Get the categories for the current page
    const questions = await Question.find(query)
      .skip((currentPage - 1) * limit)
      .limit(limit);

    res.render("question/index", {
      title: "Question List",
      questions,
      search,
      currentPage,
      totalPages,
      currentPageEntries: questions.length,
      totalEntries: totalQuestions,
      hasPreviousPage: currentPage > 1,
      previousPage: currentPage - 1,
      hasNextPage: currentPage < totalPages,
      nextPage: currentPage + 1,
      pages: Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      ),
    });
  } catch (err) {
    console.error("Error retrieving categories:", err);
    res.render("question/index", {
      title: "Questions List",
      categories: [],
      search: "",
      currentPage: 1,
      totalPages: 1,
      currentPageEntries: 0,
      totalEntries: 0,
      hasPreviousPage: false,
      previousPage: 0,
      hasNextPage: false,
      nextPage: 0,
      pages: [],
    });
  }
});

exports.searchQuestions = AysncHandler(async (req, res) => {
  const searchQuery = req.query.search;
  const questions = await Question.find({
    question: { $regex: searchQuery, $options: "i" },
  });

  res.render("question/index", {
    title: "Questions",
    questions: questions,
  });
});

//@desc  get single Question
//@route GET /api/v1/questions/:id
//@acess  Private
exports.getQuestion = AysncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);
  res.render("question/question", {
    data: question,
  });
});

//@desc   Update  Question
//@route  PUT /api/v1/questions/:id
//@acess  Private Teacher only

exports.updateQuestion = AysncHandler(async (req, res) => {
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
  //check name exists
  const questionFound = await Question.findOne({ question });
  if (questionFound) {
    throw new Error("Question already exists");
  }
  const questions = await Question.findByIdAndUpdate(
    req.params.id,
    {
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAnswer,
      category,
      difficulty,
      createdBy: req.userAuth._id,
    },
    {
      new: true,
    }
  );

  res.render("question/updateQuestion", {
    title: "Update Question",
    questions: questions,
  });
  if (question && optionA && optionB && optionC && optionD && correctAnswer) {
    res.redirect("/question/index");
  }
});
