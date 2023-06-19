const express = require("express");
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

module.exports = studentRouter;
