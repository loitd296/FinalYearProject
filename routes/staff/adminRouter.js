const express = require('express');
const app = require("../../app/app")
const { adminRegisterCtrl, adminLoginCtrl, adminGetAllCtrl, adminGetCtrl, adminUpdateCtrl, adminDeleteCtrl, adminSuspendingTeacherCtrl, adminUnsuspendingTeacherCtrl, adminWithdrawTeacher, adminUnwithdrawTeacher, adminPublicExam, adminUnpublishExam } = require("../../controller/staff/adminCtrl")

const adminRouter = express.Router();

//register
adminRouter.post('/register', adminRegisterCtrl)

//login
adminRouter.post("/login", adminLoginCtrl)

//get all admin
adminRouter.get("/", adminGetAllCtrl)

//get a admin

adminRouter.get("/:id", adminGetCtrl)
//Update admin
adminRouter.put("/:id", adminUpdateCtrl)

//Delete admin
adminRouter.delete("/:id", adminDeleteCtrl)

//Admin suspending teacher
adminRouter.put("/suspend/teacher/:id", adminSuspendingTeacherCtrl)
//Admin unsuspending teacher
adminRouter.put("/unsuspend/teacher/:id", adminUnsuspendingTeacherCtrl)

//Admin withdrawing teacher
adminRouter.put("/withdraw/teacher/:id", adminWithdrawTeacher)

//Admin unwithdrawing teacher
adminRouter.put("/unwithdraw/teacher/:id", adminUnwithdrawTeacher)

//Admin publish exam results teacher
adminRouter.put("/public/exam/:id", adminPublicExam)

//Admin unpublish exam results teacher
adminRouter.put("/unpublic/exam/:id", adminUnpublishExam)



module.exports = adminRouter