const express = require("express");
const dialogflow = require("dialogflow");

const {
  adminRegisterStudent,
  loginStudent,
  getStudentProfile,
  getAllStudentsByAdmin,
  getStudentByAdmin,
  studentUpdateProfile,
  adminUpdateStudent,
  renderSelectExam,
  writeExam,
  submitExam,
  studentLogoutCtrl,
} = require("../../controller/students/studentsCtrl");
const { chatbotInteraction } = require("../../controller/academics/chatbot"); // Import the chatbot controller

const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");
const isStudent = require("../../middlewares/isStudent");
const isStudentLogin = require("../../middlewares/isStudentLogin");
const studentRouter = express.Router();
const student = require("../../model/Academic/Student");

studentRouter.get("/admin/register", isLogin, isAdmin, (req, res) => {
  res.render("student/adminRegisterStudent", {
    title: "Teacher Registration",
  });
});
studentRouter.post("/admin/register", isLogin, isAdmin, adminRegisterStudent);

studentRouter.get("/login", (req, res) => {
  res.render("student/student-login", {
    title: "Teacher Login",
  });
});
studentRouter.post("/login", loginStudent);

studentRouter.get("/logout", isStudentLogin, isStudent, studentLogoutCtrl);

studentRouter.get("/index", isLogin, isAdmin, getAllStudentsByAdmin);
studentRouter.get("/:id/view", isLogin, isAdmin, getStudentByAdmin);

studentRouter.get("/profile", isStudentLogin, isStudent, studentUpdateProfile);
studentRouter.post("/profile", isStudentLogin, isStudent, studentUpdateProfile);

studentRouter.get("/:id/update", isLogin, isAdmin, adminUpdateStudent);
studentRouter.post("/:id/update", isLogin, isAdmin, adminUpdateStudent);

// Render the select exam page
studentRouter.get("/take-exam", isStudentLogin, isStudent, renderSelectExam);
studentRouter.get("/write/:examID", isStudentLogin, isStudent, writeExam);

studentRouter.post("/submit/:examID", isStudentLogin, submitExam);

studentRouter.get("/", isStudentLogin, isStudent, (req, res) => {
  res.render("student/student-home-page", {
    title: "Student Dashboard",
    loggedIn: res.locals.loggedIn,
    myMiddlewareProperty: res.locals.isStudent,
    student: student.role,
  });
});

// In studentRouter.js
studentRouter.get("/chat", (req, res) => {
  res.render("chatbot/chatbot"); // Assuming 'chatbot.hbs' is your template
});

studentRouter.post("/api/chatbot", async (req, res) => {
  const userMessage = req.body.message;
  try {
    const assistantReply = await chatbotInteraction(userMessage);
    res.json({ reply: assistantReply });
  } catch (error) {
    console.error("Error in chatbotInteraction:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
});

studentRouter.get("/chatbot", isStudentLogin, isStudent, (req, res) => {
  res.render("chatbot/chatbot", {
    title: "Student Dashboard",
    loggedIn: res.locals.loggedIn,
    myMiddlewareProperty: res.locals.isStudent,
    student: student.role,
  });
});

module.exports = studentRouter;
