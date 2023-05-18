const AsyncHandler = require("express-async-handler");
const Admin = require("../../model/Staff/Admin");
const generateToken = require("../../utils/generateToken");
const verifyToken = require("../../utils/verifyToken");
const { isMatched, isPassMatched } = require("../../utils/helpers");
const jwt = require("jsonwebtoken");

// adminCtrl.js
//@desc admin register
//@route POST /api/v1/admin/register
//@access Private
exports.adminRegisterCtrl = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if email exists
    const adminFound = await Admin.findOne({ email });
    if (adminFound) {
      return res.json("Admin Exists");
    }
    // Register
    const user = await Admin.create({ name, email, password });

    // Redirect to the dashboard page
    res.redirect("/admin/login");
  } catch (error) {
    res.json({ status: "failed", error: error.message });
  }
};

//@desc admin login
//@route POST /api/v1/admin/login
//@access Private
exports.adminLoginCtrl = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Find user
  const user = await Admin.findOne({ email });
  if (!user) {
    return res.render("admin/admin-login", {
      message: "Invalid login credentials",
    });
  }
  // Verify password
  const isMatched = await isPassMatched(password, user.password);
  if (isMatched) {
    // Generate JWT token
    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.SECRET_KEY
    );

    // Set the token in the response cookie or header
    res.cookie("token", token); // Or res.header("Authorization", "Bearer " + token);

    // Redirect to the dashboard page
    res.redirect("/admin/dashboard");
  } else {
    return res.render("admin/admin-login", {
      message: "Invalid login credentials",
    });
  }
});

//@desc all admin
//@route POST /api/v1/admin
//@access Private
exports.adminGetAllCtrl = AsyncHandler(async (req, res) => {
  const admins = await Admin.find();
  res.status(200).json({
    status: "success",
    message: "Get all admin successful",
    data: admins,
  });
});

//@desc get a admin
//@route GET /api/v1/admin/:id
//@access Private
exports.adminGetProfileCtrl = AsyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.userAuth._id).select(
    "-password -createdAt -updatedAt"
  );
  if (!admin) {
    throw new Error("Admin not found");
  } else {
    res.render("admin/admin-profile", {
      title: "Admin Profile",
      admin: admin.toJSON(), // Convert admin to plain JSON object
    });
  }
});

//@desc update admin
//@route POST /api/v1/admin/:id
//@access Private
exports.adminUpdateCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "Update admin successfully",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

//@desc delete admin
//@route POST /api/v1/admin/:id
//@access Private
exports.adminDeleteCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "Delete admin successfully",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

//@desc Admin suspending teacher
//@route POST /api/v1/admin/suspend/teacher/:id
//@access Private
exports.adminSuspendingTeacherCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "admin suspend teacher",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

//@desc Admin unsuspending teacher
//@route POST /api/v1/admin/unsuspend/teacher/:id
//@access Private
exports.adminUnsuspendingTeacherCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "admin unsuspend teacher",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

//@desc Admin withdrawing teacher
//@route POST /api/v1/admin/withdraw/teacher/:id
//@access Private
exports.adminWithdrawTeacher = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "admin withdraw teacher",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

//@desc Admin unwithdrawing teacher
//@route POST /api/v1/admin/unwithdrawing/teacher/:id
//@access Private
exports.adminUnwithdrawTeacher = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "admin unwithdraw teacher",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

//@desc Admin publish exam results teacher
//@route POST /api/v1/admin/public/exam/:id
//@access Private
exports.adminPublicExam = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "admin publish exam",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};

//@desc Admin unpublish exam results teacher
//@route POST /api/v1/admin/unpublish/exam/:id
//@access Private
exports.adminUnpublishExam = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "admin unpublish exam",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};
