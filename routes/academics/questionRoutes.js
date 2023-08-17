const express = require("express");
const {
  createQuestion,
  renderSelectExam,
  renderCreateQuestion,
  getQuestions,
  getQuestion,
  updateQuestion,
  searchQuestions,
  deleteQuestion,
} = require("../../controller/academics/questionsCtrl");
const isTeacher = require("../../middlewares/isTeacher");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");

const questionsRouter = express.Router();

// Render the select exam page
questionsRouter.get("/create", isTeacherLogin, isTeacher, renderSelectExam);

// Render the create question page for the selected exam
questionsRouter.get(
  "/create/:examID",
  isTeacherLogin,
  isTeacher,
  renderCreateQuestion
);

// Create a question for the selected exam
questionsRouter.post(
  "/create/:examID",
  isTeacherLogin,
  isTeacher,
  createQuestion
);

questionsRouter.get("/search", isTeacherLogin, isTeacher, searchQuestions);

questionsRouter.get("/index", isTeacherLogin, isTeacher, getQuestions);
questionsRouter.get("/:id/view", isTeacherLogin, isTeacher, getQuestion);

questionsRouter.get("/:id/update", isTeacherLogin, isTeacher, updateQuestion);
questionsRouter.post("/:id/update", isTeacherLogin, isTeacher, updateQuestion);

questionsRouter.get(
  "/:id/delete",
  isTeacherLogin,
  isTeacher,
  async (req, res) => {
    res.render("question/deleteQuestion", {
      title: "Delete Question",
      questionId: req.params.id,
    });
  }
);

questionsRouter.post("/:id/delete", isTeacherLogin, isTeacher, deleteQuestion);

module.exports = questionsRouter;
