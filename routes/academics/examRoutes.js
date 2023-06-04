const express = require("express");
const {
  createExam,
  getExams,
  getExam,
  updatExam,
  rendercreateExam,
} = require("../../controller/academics/examsCtrl");
const isTeacher = require("../../middlewares/isTeacher");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");

const examRouter = express.Router();

examRouter.get("/createExam", isTeacherLogin, isTeacher, rendercreateExam);

examRouter.post("/createExam", isTeacherLogin, isTeacher, createExam);

module.exports = examRouter;
