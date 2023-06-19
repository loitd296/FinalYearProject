const express = require("express");
const {
  checkExamResults,
  getAllExamResults,
  adminToggleExamResult,
} = require("../../controller/academics/examResults");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");
const isStudent = require("../../middlewares/isStudent");
const isStudentLogin = require("../../middlewares/isStudentLogin");

const examResultRouter = express.Router();

examResultRouter.get("/", isStudentLogin, isStudent, getAllExamResults);

examResultRouter.get("/:id/checking", isStudentLogin, isStudent, (req, res) => {
  const studentId = req.params.id; // Get the student ID from the route

  checkExamResults(req, res, studentId);
});

examResultRouter.get(
  "/:id/checking",
  isStudentLogin,
  isStudent,
  checkExamResults
);
examResultRouter.put(
  "/:id/admin-toggle-publish",
  isLogin,
  isAdmin,
  adminToggleExamResult
);
module.exports = examResultRouter;
