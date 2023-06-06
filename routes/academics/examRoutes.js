const express = require("express");
const {
  createExam,
  getExams,
  getExam,
  updateExam,
  rendercreateExam,
  searchExams,
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

module.exports = examRouter;
