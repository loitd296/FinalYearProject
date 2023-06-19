const express = require("express");
const {
  adminRegisterTeacher,
  loginTeacher,
  getAllTeachersAdmin,
  getTeacherByAdmin,
  getTeacherProfile,
  teacherUpdateProfile,
  adminUpdateTeacher,
  teacherLogoutCtrl,
  renderTeacherPage,
  deleteTeacher,
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

teachersRouter.get("/logout", isTeacherLogin, isTeacher, teacherLogoutCtrl);

teachersRouter.get("/profile", isTeacherLogin, isTeacher, teacherUpdateProfile);
teachersRouter.post(
  "/profile",
  isTeacherLogin,
  isTeacher,
  teacherUpdateProfile
);

teachersRouter.get("/:id/view", isLogin, isAdmin, getTeacherByAdmin);

teachersRouter.get("/:id", isTeacherLogin, isTeacher, teacherUpdateProfile);
teachersRouter.post("/:id", isTeacherLogin, isTeacher, teacherUpdateProfile);

teachersRouter.get("/:id/update", isLogin, isAdmin, adminUpdateTeacher);
teachersRouter.post("/:id/update", isLogin, isAdmin, adminUpdateTeacher);

teachersRouter.get("/:id/delete", isLogin, isAdmin, async (req, res) => {
  res.render("teacher/deleteTeacher", {
    title: "Delete Subject",
    teacherId: req.params.id,
  });
});

teachersRouter.post("/:id/delete", isLogin, isAdmin, deleteTeacher);

module.exports = teachersRouter;
