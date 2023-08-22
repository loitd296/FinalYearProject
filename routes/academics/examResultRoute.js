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
const ExamResult = require("../../model/Academic/ExamResults");

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
examResultRouter.get(
  "/:id/admin-toggle-publish",
  isLogin,
  isAdmin,
  async (req, res) => {
    const examResult = await ExamResult.findById(req.params.id);
    if (!examResult) {
      throw new Error("Exam result not found");
    }

    res.render("exam-result/admin-toggle-result", { examResult });
  }
);

// Use the adminToggleExamResult controller function for updating
examResultRouter.put(
  "/:id/admin-toggle-publish",
  isLogin,
  isAdmin,
  adminToggleExamResult
);
module.exports = examResultRouter;
