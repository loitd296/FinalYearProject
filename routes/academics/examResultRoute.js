const express = require("express");
const {
  checkExamResults,
  getAllExamResults,
  adminToggleExamResult,
  adminExamResults,
  deleteExamResult,
  publishExamResult,
} = require("../../controller/academics/examResults");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");
const isStudent = require("../../middlewares/isStudent");
const isStudentLogin = require("../../middlewares/isStudentLogin");
const ExamResult = require("../../model/Academic/ExamResults");
const Exam = require("../../model/Academic/Exam");

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

examResultRouter.get("/index_admin", isLogin, isAdmin, adminExamResults);

examResultRouter.get("/:id/delete", isLogin, isAdmin, async (req, res) => {
  res.render("exam-result/deleteExamResult", {
    title: "Delete Exam Result",
    examResultId: req.params.id,
  });
});

examResultRouter.post("/:id/delete", isLogin, isAdmin, deleteExamResult);
// Use the adminToggleExamResult controller function for updating
examResultRouter.post(
  "/:id/admin-toggle-publish",
  isLogin,
  isAdmin,
  adminToggleExamResult
);

// Add this route to your existing routes
examResultRouter.post("/:id/publish", isLogin, isAdmin, publishExamResult);

module.exports = examResultRouter;
