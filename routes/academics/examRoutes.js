const express = require("express");
const {
  createExam,
  getExams,
  getExam,
  updateExam,
  rendercreateExam,
  searchExams,
  renderAddQuestionPage,
  addQuestionToExam,
  renderAddQuestionForm,
  attachQuestionToExam,
  getMoreQuestions,
  createExamForm,
  createExamAuto,
  deleteExam,
  updateQuestionExam,
  deleteQuestionExam,
} = require("../../controller/academics/examsCtrl");
const isTeacher = require("../../middlewares/isTeacher");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");

const examRouter = express.Router();

examRouter.get("/createExam", isTeacherLogin, isTeacher, rendercreateExam);

examRouter.post("/createExam", isTeacherLogin, isTeacher, createExam);

examRouter.get("/create-exam", createExamForm);
examRouter.post("/create-exam", createExamAuto);

examRouter.get("/index", isTeacherLogin, isTeacher, getExams);

examRouter.get("/search", isTeacherLogin, isTeacher, searchExams);

examRouter.get("/:id", isTeacherLogin, isTeacher, getExam);

examRouter.get("/:id/update", isTeacherLogin, isTeacher, rendercreateExam);
examRouter.post("/:id/update", isTeacherLogin, isTeacher, updateExam);

// ...

// GET route to render the edit question form
examRouter.get(
  "/:id/edit-question",
  isTeacherLogin,
  isTeacher,
  updateQuestionExam
);

examRouter.get(
  "/:examId/edit-question/:questionId",
  isTeacherLogin,
  isTeacher,
  updateQuestionExam
);
// POST route to handle updating a question
examRouter.post(
  "/:examId/edit-question/:questionId",
  isTeacherLogin,
  isTeacher,
  updateQuestionExam
);

// ...

examRouter.post(
  "/:examId/delete-question/:questionId",
  isTeacherLogin,
  isTeacher,
  deleteQuestionExam
);

examRouter.get("/:id/delete", isTeacherLogin, isTeacher, async (req, res) => {
  res.render("exam/deleteExam", {
    title: "Delete Exam",
    examId: req.params.id,
  });
});

examRouter.post("/:id/delete", isTeacherLogin, isTeacher, deleteExam);

// GET route to render the add question page
examRouter.get(
  "/:id/add-question",
  isTeacherLogin,
  isTeacher,
  renderAddQuestionPage
);

// POST route to add a question to an exam
examRouter.post(
  "/:id/add-question",
  isTeacherLogin,
  isTeacher,
  addQuestionToExam
);

examRouter.get(
  "/:id/attach-question",
  isTeacherLogin,
  isTeacher,
  renderAddQuestionForm
);

// POST route to attach a question to an exam
examRouter.post(
  "/:id/attach-question",
  isTeacherLogin,
  isTeacher,
  attachQuestionToExam
);
// Please ensure this route is above the ":id/attach-question" GET route
examRouter.get(
  "/:id/attach-question/more",
  isTeacherLogin,
  isTeacher,
  getMoreQuestions
);

module.exports = examRouter;
