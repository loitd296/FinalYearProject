const Admin = require('../../model/Staff/Admin')

//@desc admin register
//@route POST /api/v1/admin/register
//@access Private
exports.adminRegisterCtrl = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      //Check if email exists
      const adminFound = await Admin.findOne({ email });
      if (adminFound) {
        res.json("Admin Exists");
      }
      //register
      const user = await Admin.create({
        name,
        email,
        password,
      });
      res.status(201).json({
        status: "success",
        data: user,
      });
    } catch (error) {
      res.json({
        status: "failed",
        error: error.message,
      });
    }
  };

//@desc admin login
//@route POST /api/v1/admin/login
//@access Private

exports.adminLoginCtrl = async (req, res) => {
    const { email, password } = req.body;
    try {
      //find user
      const user = await Admin.findOne({ email });
      if (!user) {
        return res.json({ message: "Invliad login crendentials" });
      }
      if (user && (await user.verifyPassword(password))) {
        return res.json({ data: user });
      } else {
        return res.json({ message: "Invliad login crendentials" });
      }
    } catch(error){
        res.json({
            status: "failed",
            error: error.message,
        });
    }
}

//@desc all admin
//@route POST /api/v1/admin
//@access Private
exports.adminGetAllCtrl = (req, res) => {
    try{
        res.status(201).json({
            status: "success",
            data: "All admin",
        });

    } catch(error){
        res.json({
            status: "failed",
            error: error.message,
        });
    }
}

//@desc get a admin
//@route POST /api/v1/admin/:id
//@access Private
exports.adminGetCtrl = (req, res) => {
    try{
        res.status(201).json({
            status: "success",
            data: "Get single admin",
        });

    } catch(error){
        res.json({
            status: "failed",
            error: error.message,
        });
    }
}

//@desc update admin
//@route POST /api/v1/admin/:id
//@access Private
exports.adminUpdateCtrl = (req, res) => {
    try{
        res.status(201).json({
            status: "success",
            data: "Update admin successfully",
        });

    } catch(error){
        res.json({
            status: "failed",
            error: error.message,
        });
    }
}

//@desc delete admin
//@route POST /api/v1/admin/:id
//@access Private
exports.adminDeleteCtrl = (req, res) => {
    try{
        res.status(201).json({
            status: "success",
            data: "Delete admin successfully",
        });

    } catch(error){
        res.json({
            status: "failed",
            error: error.message,
        });
    }
}

//@desc Admin suspending teacher
//@route POST /api/v1/admin/suspend/teacher/:id
//@access Private
exports.adminSuspendingTeacherCtrl = (req, res) => {
    try{
        res.status(201).json({
            status: "success",
            data: "admin suspend teacher",
        });

    } catch(error){
        res.json({
            status: "failed",
            error: error.message,
        });
    }
}

//@desc Admin unsuspending teacher
//@route POST /api/v1/admin/unsuspend/teacher/:id
//@access Private
exports.adminUnsuspendingTeacherCtrl = (req, res) => {
    try{
        res.status(201).json({
            status: "success",
            data: "admin unsuspend teacher",
        });

    } catch(error){
        res.json({
            status: "failed",
            error: error.message,
        });
    }
}

//@desc Admin withdrawing teacher
//@route POST /api/v1/admin/withdraw/teacher/:id
//@access Private
exports.adminWithdrawTeacher = (req, res) => {
    try{
        res.status(201).json({
            status: "success",
            data: "admin withdraw teacher",
        });

    } catch(error){
        res.json({
            status: "failed",
            error: error.message,
        });
    }
}

//@desc Admin unwithdrawing teacher
//@route POST /api/v1/admin/unwithdrawing/teacher/:id
//@access Private
exports.adminUnwithdrawTeacher = (req, res) => {
    try{
        res.status(201).json({
            status: "success",
            data: "admin unwithdraw teacher",
        });

    } catch(error){
        res.json({
            status: "failed",
            error: error.message,
        });
    }
}

//@desc Admin publish exam results teacher
//@route POST /api/v1/admin/public/exam/:id
//@access Private
exports.adminPublicExam = (req, res) => {
    try{
        res.status(201).json({
            status: "success",
            data: "admin publish exam",
        });

    } catch(error){
        res.json({
            status: "failed",
            error: error.message,
        });
    }
}

//@desc Admin unpublish exam results teacher
//@route POST /api/v1/admin/unpublish/exam/:id
//@access Private
exports.adminUnpublishExam = (req, res) => {
    try{
        res.status(201).json({
            status: "success",
            data: "admin unpublish exam",
        });

    } catch(error){
        res.json({
            status: "failed",
            error: error.message,
        });
    }
}
