const express = require("express");
const {
  adminRegisterTeacher,
  loginTeacher,
  getAllTeachersAdmin,
  getTeacherByAdmin,
  getTeacherProfile,
  teacherUpdateProfile,
  adminUpdateTeacher,
} = require("../../controller/staff/teachersCtrl");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");
const isTeacher = require("../../middlewares/isTeacher");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");
const teachersRouter = express.Router();

teachersRouter.get("/admin/register", isLogin, isAdmin, (req, res) => {
  res.render("teacher/teacher-register", { title: "Teacher Registration" });
});
teachersRouter.post("/admin/register", isLogin, isAdmin, adminRegisterTeacher);

teachersRouter.post("/login", loginTeacher);
teachersRouter.get("/login", (req, res) => {
  res.render("teacher/teacher-login", { title: "Admin Login" });
});

teachersRouter.get("/index", isLogin, isAdmin, getAllTeachersAdmin);

teachersRouter.get("/profile", isTeacherLogin, isTeacher, teacherUpdateProfile);
teachersRouter.post(
  "/profile",
  isTeacherLogin,
  isTeacher,
  teacherUpdateProfile
);

teachersRouter.get("/:id", isLogin, isAdmin, getTeacherByAdmin);

teachersRouter.get("/:id", isTeacherLogin, isTeacher, teacherUpdateProfile);
teachersRouter.post("/:id", isTeacherLogin, isTeacher, teacherUpdateProfile);

teachersRouter.get("/:id/update", isLogin, isAdmin, adminUpdateTeacher);
teachersRouter.post("/:id/update", isLogin, isAdmin, adminUpdateTeacher);

module.exports = teachersRouter;
