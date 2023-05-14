const express = require("express");
const app = require("../../app/app");
const {
  adminRegisterCtrl,
  adminLoginCtrl,
  adminGetAllCtrl,
  adminGetProfileCtrl,
  adminUpdateCtrl,
  adminDeleteCtrl,
  adminSuspendingTeacherCtrl,
  adminUnsuspendingTeacherCtrl,
  adminWithdrawTeacher,
  adminUnwithdrawTeacher,
  adminPublicExam,
  adminUnpublishExam,
} = require("../../controller/staff/adminCtrl");
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

//get all admin
adminRouter.get("/", adminGetAllCtrl);

//get a admin

adminRouter.get("/profile", isLogin, adminGetProfileCtrl);
//Update admin
adminRouter.put("/:id", adminUpdateCtrl);

//Delete admin
adminRouter.delete("/:id", adminDeleteCtrl);

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

adminRouter.get("/dashboard", (req, res) => {
  res.render("admin/index", { title: "Admin Dashboard" });
});

module.exports = adminRouter;
