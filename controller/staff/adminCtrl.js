const AsyncHandler = require("express-async-handler");
const AcademicYear = require("../../model/Academic/AcademicYear");
const AcademicTerm = require("../../model/Academic/AcademicTerm");
const Admin = require("../../model/Staff/Admin");
const Student = require("../../model/Academic/Student");
const Program = require("../../model/Academic/Program");
const Teacher = require("../../model/Staff/Teacher");
const Exam = require("../../model/Academic/Exam");
const ExamResult = require("../../model/Academic/ExamResults");

const generateToken = require("../../utils/generateToken");
const verifyToken = require("../../utils/verifyToken");
const { hashPassword, isPassMatched } = require("../../utils/helpers");
const jwt = require("jsonwebtoken");
const { calculatePageRange } = require("../../utils/paginationUtils");

// adminCtrl.js
//@desc admin register
//@route POST /admin/register
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
//@route POST /admin/login
//@access Private
exports.adminLoginCtrl = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if user is already logged in
  if (req.user) {
    return res.redirect("/admin/dashboard");
  }

  // Find user
  const user = await Admin.findOne({ email });
  if (!user) {
    return res.render("admin/admin-login", {
      message: "Invalid log in credentials",
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
//@route POST /admin
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
//@route GET /admin/:id
//@access Private
exports.adminGetProfileCtrl = AsyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.userAuth._id)
    .select("-password -createdAt -updatedAt")
    .populate("academicYears");
  if (!admin) {
    throw new Error("Admin not found");
  } else {
    res.render("admin/admin-profile", {
      title: "Admin Profile",
      admin: admin.toJSON(), // Convert admin to plain JSON object
    });
  }
});

// @desc    Update admin
// @route   PUT /admin/:id
// @access  Private
exports.adminUpdateCtrl = AsyncHandler(async (req, res) => {
  const { email, name, password } = req.body;
  const adminId = req.params.id;

  // if email is taken by another admin
  const emailExist = await Admin.findOne({ email, _id: { $ne: adminId } });
  if (emailExist) {
    throw new Error("This email is already taken by another admin.");
  }

  // hash the password
  const hashedPassword = await hashPassword(password);

  // Prepare the update fields
  const updateFields = { email, name, password: hashedPassword };

  // Update the admin
  const admin = await Admin.findByIdAndUpdate(adminId, updateFields, {
    new: true,
    runValidators: true,
  });

  res.render("admin/admin-profile", {
    title: "Admin Profile",
    admin: admin,
    message: "Admin updated successfully",
  });
});

//@desc delete admin
//@route POST /admin/:id
//@access Private
exports.deleteAdmin = AsyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.params.id);
  if (!admin) {
    throw new Error("Subject not found");
  }

  await Admin.deleteOne({ _id: req.params.id });

  res.redirect("/admin/index"); // Redirect to the list or any other desired page
});

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

// Admin Logout
exports.adminLogoutCtrl = (req, res) => {
  // Clear the token cookie
  res.clearCookie("token");

  // Redirect to the login page
  res.redirect("/admin/login");
};

exports.renderAdminPage = (req, res) => {
  // Check if the user is logged in
  const loggedIn = req.isAuthenticated(); // Example, replace this with your own authentication logic

  // Set loggedIn to false in res.locals
  res.locals.loggedIn = false;

  // Render the template and pass the loggedIn variable
  res.render("/admin/index", { loggedIn });
};

exports.renderDashboard = async (req, res) => {
  try {
    const adminCount = await Admin.countDocuments();
    const studentCount = await Student.countDocuments();
    const teacherCount = await Teacher.countDocuments();
    const programCount = await Program.countDocuments();
    // Get pass and fail counts
    const passCount = await ExamResult.countDocuments({ status: "passed" });
    const failCount = await ExamResult.countDocuments({ status: "failed" });

    // Get the top 10 students with the highest grades
    const studentGrades = await ExamResult.aggregate([
      {
        $group: {
          _id: "$student",
          totalGrade: { $sum: "$grade" },
        },
      },
      {
        $lookup: {
          from: "students",
          localField: "_id",
          foreignField: "_id",
          as: "studentInfo",
        },
      },
      {
        $unwind: "$studentInfo",
      },
      {
        $project: {
          studentName: "$studentInfo.name",
          totalGrade: 1,
        },
      },
      {
        $sort: { totalGrade: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    const studentNames = studentGrades.map((student) => student.studentName);
    const studentTotalGrades = studentGrades.map(
      (student) => student.totalGrade
    );

    // Retrieve the exams and their average scores
    const exams = await Exam.find({}, "name");
    const examIds = exams.map((exam) => exam._id);

    // Retrieve exam performance data from the database
    const examPerformanceData = await ExamResult.aggregate([
      {
        $match: { exam: { $in: examIds } },
      },
      {
        $group: {
          _id: "$exam",
          totalScore: { $sum: "$grade" },
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "exams",
          localField: "_id",
          foreignField: "_id",
          as: "examInfo",
        },
      },
      {
        $unwind: "$examInfo",
      },
      {
        $project: {
          examName: "$examInfo.name",
          averageScore: { $divide: ["$totalScore", "$count"] },
        },
      },
    ]);

    // Create arrays for chart data
    const examNames = examPerformanceData.map((exam) => exam.examName);
    const averageScores = examPerformanceData.map((exam) => exam.averageScore);

    // Fetch data for the chart
    const academicYears = await AcademicYear.find({}, "name"); // Fetch academic year names
    const studentCounts = await Promise.all(
      academicYears.map(async (year) => {
        const count = await Student.countDocuments({ academicYear: year._id });
        return count;
      })
    );

    res.render("admin/index", {
      adminCount,
      studentCount,
      teacherCount,
      programCount,
      studentGrades,
      studentNames,
      studentTotalGrades,
      examNames,
      averageScores,
      passCount, // Add pass count to the template data
      failCount, // Add fail count to the template data
      academicYearNames: academicYears.map((year) => year.name),
      studentCounts,
      title: "Admin Dashboard",
      loggedIn: res.locals.loggedIn,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve dashboard data" });
  }
};
