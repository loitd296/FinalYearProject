const express = require("express");
const app = require("../../app/app");
const {
  adminRegisterCtrl,
  adminLoginCtrl,
  adminGetAllCtrl,
  adminGetProfileCtrl,
  adminUpdateCtrl,
  adminDeleteCtrl,
  adminLogoutCtrl,
  adminSuspendingTeacherCtrl,
  adminUnsuspendingTeacherCtrl,
  adminWithdrawTeacher,
  adminUnwithdrawTeacher,
  adminPublicExam,
  adminUnpublishExam,
  deleteAdmin,
  renderDashboard,
} = require("../../controller/staff/adminCtrl");
const { globalErrHandler } = require("../../middlewares/globalErrorHandler");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

const adminRouter = express.Router();

//register
adminRouter.post("/register", adminRegisterCtrl);
// GET request for admin registration page
adminRouter.get("/register", (req, res) => {
  res.render("admin/admin-register", { title: "Admin Registration" });
});

//login
adminRouter.post("/login", adminLoginCtrl);
// Login route
adminRouter.get("/login", (req, res) => {
  res.render("admin/admin-login", { title: "Admin Login" });
});

//get all admin
adminRouter.get("/", isLogin, isAdmin, adminGetAllCtrl);

// adminRouter.get("/profile", isLogin, adminGetProfileCtrl);
// Profile route
adminRouter.get("/profile", isLogin, adminGetProfileCtrl, (req, res, next) => {
  res.render("admin/admin-profile", {
    title: "Admin Profile",
    admin: req.userAuth,
  });
});

// Update admin
adminRouter.post("/:id", isLogin, isAdmin, adminUpdateCtrl, (req, res) => {
  res.render("admin/admin-profile", {
    title: "Admin Profile",
    admin: req.userAuth,
    message: "Admin updated successfully",
    loggedIn: res.locals.loggedIn,
  });
});

//Admin suspending teacher
adminRouter.put("/suspend/teacher/:id", adminSuspendingTeacherCtrl);
//Admin unsuspending teacher
adminRouter.put("/unsuspend/teacher/:id", adminUnsuspendingTeacherCtrl);

//Admin withdrawing teacher
adminRouter.put("/withdraw/teacher/:id", adminWithdrawTeacher);

//Admin unwithdrawing teacher
adminRouter.put("/unwithdraw/teacher/:id", adminUnwithdrawTeacher);

//Admin publish exam results teacher
adminRouter.put("/public/exam/:id", adminPublicExam);

//Admin unpublish exam results teacher
adminRouter.put("/unpublic/exam/:id", adminUnpublishExam);

// Define admin routes

adminRouter.get("/dashboard", isLogin, isAdmin, renderDashboard);

adminRouter.get("/test", async (req, res) => {
  res.render("admin/test");
});

adminRouter.get("/logout", isLogin, isAdmin, adminLogoutCtrl);

module.exports = adminRouter;
