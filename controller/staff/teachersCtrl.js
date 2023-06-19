const AysncHandler = require("express-async-handler");
const Teacher = require("../../model/Staff/Teacher");
const Program = require("../../model/Academic/Program");
const ClassLevel = require("../../model/Academic/ClassLevel"); // Import the ClassLevel model
const AcademicYear = require("../../model/Academic/AcademicYear"); // Import the AcademicYear model
const Subject = require("../../model/Academic/Subject"); // Import the Subject model

const generateToken = require("../../utils/generateToken");
const { hashPassword, isPassMatched } = require("../../utils/helpers");
const jwt = require("jsonwebtoken");
const isAdmin = require("../../middlewares/isAdmin");
const isTeacher = require("../../middlewares/isTeacher");
const cookieParser = require("cookie-parser");

//@desc  Admin Register Teacher
//@route POST /api/teachers/admin/register
//@acess  Private

exports.adminRegisterTeacher = AysncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //check if teacher already exists
  const teacher = await Teacher.findOne({ email });
  if (teacher) {
    throw new Error("Teacher already employed");
  }
  //Hash password
  const hashedPassword = await hashPassword(password);
  // create
  const teacherCreated = await Teacher.create({
    name,
    email,
    password: hashedPassword,
  });
  //send teacher data
  res.status(201).json({
    status: "success",
    message: "Teacher registered successfully",
    data: teacherCreated,
  });
});

//@desc    login a teacher
//@route   POST /api/v1/teachers/login
//@access  Public

exports.loginTeacher = AysncHandler(async (req, res) => {
  const { email, password } = req.body;
  //find the  user
  const teacher = await Teacher.findOne({ email });
  if (!teacher) {
    return res.json({ message: "Invalid login crendentials" });
  }
  //verify the password
  const isMatched = await isPassMatched(password, teacher.password);
  if (isMatched) {
    // Generate JWT token
    const token = jwt.sign(
      { _id: teacher._id.toString() },
      process.env.SECRET_KEY
    );

    // Set the token in the response cookie or header
    res.cookie("token", token); // Or res.header("Authorization", "Bearer " + token);

    // Redirect to the dashboard page
    res.redirect("/teacher/profile");
  } else {
    res.redirect("/teacher/login");
  }
});

//@desc    Get all Teachers
//@route   GET /api/v1/admin/teachers
//@access  Private admin only

exports.getAllTeachersAdmin = AysncHandler(async (req, res) => {
  const teachers = await Teacher.find();
  res.render("teacher/index", {
    message: "Invalid login credentials",
    teachers: teachers,
  });
});

//@desc    Get Single Teacher
//@route   GET /api/v1/teachers/:teacherID/admin
//@access  Private admin only

exports.getTeacherByAdmin = AysncHandler(async (req, res) => {
  //find the teacher
  const teacher = await Teacher.findById(req.params.id);
  if (!teacher) {
    throw new Error("Teacher not found");
  }
  res.render("teacher/teacher", {
    title: "Teacher",
    teacher: teacher,
  });
});

//@desc    Teacher Profile
//@route   GET /api/v1/teachers/profile
//@access  Private Teacher only

exports.getTeacherProfile = AysncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.userAuth?._id).select(
    "-password -createdAt -updatedAt"
  );
  if (!teacher) {
    throw new Error("Teacher not found");
  }
  res.status(200).json({
    status: "success",
    data: teacher,
    message: "Teacher Profile fetched  successfully",
  });
});

//@desc    Teacher updating profile admin
//@route    UPDATE /api/v1/teachers/:teacherID/update
//@access   Private Teacher only

exports.teacherUpdateProfile = AysncHandler(async (req, res) => {
  const { email, name, password } = req.body;

  // Check if email is taken
  const emailExist = await Teacher.findOne({ email });
  if (emailExist) {
    throw new Error("This email is taken/exist");
  }

  // Hash password if provided
  if (password) {
    // Update profile with password
    const teacher = await Teacher.findByIdAndUpdate(
      req.userAuth._id,
      {
        email,
        password: await hashPassword(password),
        name,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.render("teacher/teacher-profile", {
      data: teacher,
      myMiddlewareProperty: res.locals.isTeacher,
      loggedIn: res.locals.loggedIn,
      teacher: teacher.userAuth,
    });
  } else {
    // Update profile without password
    const teacher = await Teacher.findByIdAndUpdate(
      req.userAuth._id,
      {
        email,
        name,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.render("teacher/teacher-profile", {
      data: teacher,
      loggedIn: res.locals.loggedIn,
      myMiddlewareProperty: res.locals.isTeacher,
      teacher: teacher.role,
    });
  }
});

//@desc     Admin updating Teacher profile
//@route    UPDATE /api/v1/teachers/:teacherID/admin
//@access   Private Admin only

exports.adminUpdateTeacher = AysncHandler(async (req, res) => {
  const { program, classLevel, academicYear, subject } = req.body;
  //if email is taken

  const teacherFound = await Teacher.findById(req.params.id);
  console.log(teacherFound);
  if (!teacherFound) {
    throw new Error("Teacher not found");
  }
  //Check if teacher is withdrawn
  if (teacherFound.isWitdrawn) {
    throw new Error("Action denied, teacher is withdraw");
  }
  // Fetch programs, class levels, academic years, and subjects from the database
  const programs = await Program.find();
  const classLevels = await ClassLevel.find();
  const academicYears = await AcademicYear.find();
  const subjects = await Subject.find();
  //assign a program
  if (program) {
    teacherFound.program = program;
    await teacherFound.save();
    res.status(200).json({
      status: "success",
      data: teacherFound,
      message: "Teacher updated successfully",
    });
  }

  //assign Class level
  if (classLevel) {
    teacherFound.classLevel = classLevel;
    await teacherFound.save();
    res.status(200).json({
      status: "success",
      data: teacherFound,
      message: "Teacher updated successfully",
    });
  }

  //assign Academic year
  if (academicYear) {
    teacherFound.academicYear = academicYear;
    await teacherFound.save();
    res.status(200).json({
      status: "success",
      data: teacherFound,
      message: "Teacher updated successfully",
    });
  }

  //assign subject
  if (subject) {
    teacherFound.subject = subject;
    await teacherFound.save();
    res.status(200).json({
      status: "success",
      data: teacherFound,
      message: "Teacher updated successfully",
    });
  }
  res.render("teacher/admin-update-teacher", {
    programs,
    classLevels,
    academicYears,
    subjects,
    program,
    classLevel,
    academicYear,
    subject,
    teacherFound,
    res,
    throw: Error,
  });
});

exports.deleteTeacher = AysncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);
  if (!teacher) {
    throw new Error("Subject not found");
  }

  await Teacher.deleteOne({ _id: req.params.id });

  res.redirect("/teacher/index"); // Redirect to the list or any other desired page
});

// Admin Logout
exports.teacherLogoutCtrl = (req, res) => {
  // Clear the token cookie
  res.clearCookie("token");

  // Redirect to the login page
  res.redirect("/teacher/login");
};

exports.renderTeacherPage = (req, res) => {
  // Check if the user is logged in
  const loggedIn = req.isAuthenticated(); // Example, replace this with your own authentication logic

  // Set loggedIn to false in res.locals
  res.locals.loggedIn = false;

  // Render the template and pass the loggedIn variable
  res.render("/", { loggedIn });
};
