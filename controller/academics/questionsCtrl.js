const AysncHandler = require("express-async-handler");
const Exam = require("../../model/Academic/Exam");
const Question = require("../../model/Academic/Questions");

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

    res.render("question/createQuestion", { exam });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a question for the selected exam
exports.createQuestion = AysncHandler(async (req, res) => {
  const { question, optionA, optionB, optionC, optionD, correctAnswer } =
    req.body;
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
      exam: examID,
      createdBy: req.userAuth._id,
    });

    exam.questions.push(createdQuestion._id);
    await exam.save();

    res.status(201).json({
      status: "success",
      message: "Question created",
      data: createdQuestion,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//@desc  get all questions
//@route GET /api/v1/questions
//@acess  Private - Teacher only

exports.getQuestions = AysncHandler(async (req, res) => {
  const questions = await Question.find();
  res.render("question/index", {
    questions: questions,
  });
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
  const { question, optionA, optionB, optionC, optionD, correctAnswer } =
    req.body;
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
