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
} = require("../../controller/academics/examsCtrl");
const isTeacher = require("../../middlewares/isTeacher");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");

const examRouter = express.Router();

examRouter.get("/createExam", isTeacherLogin, isTeacher, rendercreateExam);

examRouter.post("/createExam", isTeacherLogin, isTeacher, createExam);

examRouter.get("/index", isTeacherLogin, isTeacher, getExams);

examRouter.get("/search", isTeacherLogin, isTeacher, searchExams);

examRouter.get("/:id", isTeacherLogin, isTeacher, getExam);

examRouter.get("/:id/update", isTeacherLogin, isTeacher, rendercreateExam);
examRouter.post("/:id/update", isTeacherLogin, isTeacher, updateExam);

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

module.exports = examRouter;
