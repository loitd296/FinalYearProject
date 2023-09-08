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
examResultRouter.get(
  "/admin-toggle-publish",
  isLogin,
  isAdmin,
  async (req, res) => {
    try {
      const exams = await Exam.find();
      const examResults = await ExamResult.find();
      res.render("exam-result/admin-toggle-result", { exams, examResults });
    } catch (error) {
      // Handle error
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

examResultRouter.post("/publish/:id", isLogin, isAdmin, async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    console.log(exam);
    if (!exam) {
      throw new Error("Exam not found");
    }

    // Update the isPublished property of all associated exam results
    await ExamResult.updateMany(
      { exam: exam._id },
      { isPublished: req.body.publish }
    );

    res.status(200).json({
      status: "success",
      message: "Exam Results Updated",
    });
  } catch (error) {
    // Handle error
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

// Use the adminToggleExamResult controller function for updating
examResultRouter.post(
  "/:id/admin-toggle-publish",
  isLogin,
  isAdmin,
  adminToggleExamResult
);
module.exports = examResultRouter;
