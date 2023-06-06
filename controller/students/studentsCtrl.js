const AysncHandler = require("express-async-handler");
const Student = require("../../model/Academic/Student");
const Program = require("../../model/Academic/Program");
const ClassLevel = require("../../model/Academic/ClassLevel"); // Import the ClassLevel model
const AcademicYear = require("../../model/Academic/AcademicYear"); // Import the AcademicYear model

const generateToken = require("../../utils/generateToken");
const { hashPassword, isPassMatched } = require("../../utils/helpers");
const jwt = require("jsonwebtoken");

//@desc  Admin Register Student
//@route POST /api/students/admin/register
//@acess  Private Admin only

exports.adminRegisterStudent = AysncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //check if teacher already exists
  const student = await Student.findOne({ email });
  if (student) {
    throw new Error("Student already employed");
  }
  //Hash password
  const hashedPassword = await hashPassword(password);
  // create
  const studentRegistered = await Student.create({
    name,
    email,
    password: hashedPassword,
  });
  //send student data
  res.status(201).json({
    status: "success",
    message: "Student registered successfully",
    data: studentRegistered,
  });
});

//@desc    login  student
//@route   POST /api/v1/students/login
//@access  Public

exports.loginStudent = AysncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Find the user
  const student = await Student.findOne({ email });
  if (!student) {
    return res.json({ message: "Invalid login credentials" });
  }
  // Verify the password
  const isMatched = await isPassMatched(password, student?.password);
  if (!isMatched) {
    return res.json({ message: "Invalid login credentials" });
  } else {
    // Generate a token
    const payload = { _id: student._id.toString() };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    // Set the token in the response cookie or header
    res.cookie("token", token);

    // Set the authenticated user's ID in req.userAuth
    req.userAuth = { _id: student._id.toString() };

    res.status(200).json({
      status: "success",
      message: "Student logged in successfully",
      data: token,
    });
  }
});

//@desc    Get all Students
//@route   GET /api/v1/admin/students
//@access  Private admin only

exports.getAllStudentsByAdmin = AysncHandler(async (req, res) => {
  const students = await Student.find();
  res.render("student/index", {
    title: "Teachers",
    students: students,
  });
});

//@desc    Get Single Student
//@route   GET /api/v1/students/:studentID/admin
//@access  Private admin only

exports.getStudentByAdmin = AysncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    throw new Error("Student not found");
  }
  res.render("student/student", {
    status: "success",
    message: "Student fetched successfully",
    data: student,
  });
});

//@desc    Student updating profile
//@route    UPDATE /api/v1/students/update
//@access   Private Student only

exports.studentUpdateProfile = AysncHandler(async (req, res) => {
  const { email, password } = req.body;
  //if email is taken
  const emailExist = await Student.findOne({ email });
  if (emailExist) {
    throw new Error("This email is taken/exist");
  }

  //hash password
  //check if user is updating password

  if (password) {
    //update
    const student = await Student.findByIdAndUpdate(
      req.userAuth._id,
      {
        email,
        password: await hashPassword(password),
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.render("student/student-profile", {
      data: student,
      myMiddlewareProperty: res.locals.isStudent,
      loggedIn: res.locals.loggedIn,
      student: student.userAuth,
    });
  } else {
    //update
    const student = await Student.findByIdAndUpdate(
      req.userAuth._id,
      {
        email,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.render("student/student-profile", {
      data: student,
      loggedIn: res.locals.loggedIn,
      myMiddlewareProperty: res.locals.isStudent,
      student: student.role,
    });
  }
});

//@desc     Admin updating Students eg: Assigning classes....
//@route    UPDATE /api/v1/students/:studentID/update/admin
//@access   Private Admin only

exports.adminUpdateStudent = AysncHandler(async (req, res) => {
  const { classLevel, academicYear, program, name, email, prefectName } =
    req.body;

  //find the student by id
  const studentFound = await Student.findById(req.params.id);
  if (!studentFound) {
    throw new Error("Student not found");
  }

  // Fetch programs, class levels, academic years, and subjects from the database
  const programs = await Program.find();
  const classLevels = await ClassLevel.find();
  const academicYears = await AcademicYear.find();

  if (name) {
    studentFound.name = name;
    await studentFound.save();
    res.status(200).json({
      status: "success",
      data: studentFound,
      message: "Student updated successfully",
    });
  }
  if (email) {
    studentFound.email = email;
    await studentFound.save();
    res.status(200).json({
      status: "success",
      data: studentFound,
      message: "Student updated successfully",
    });
  }
  if (prefectName) {
    studentFound.prefectName = prefectName;
    await studentFound.save();
    res.status(200).json({
      status: "success",
      data: studentFound,
      message: "Student updated successfully",
    });
  }

  if (program) {
    studentFound.program = program;
    await studentFound.save();
    res.status(200).json({
      status: "success",
      data: studentFound,
      message: "Student updated successfully",
    });
  }
  //assign Class level
  if (classLevel) {
    studentFound.classLevel = classLevel;
    await studentFound.save();
    res.status(200).json({
      status: "success",
      data: studentFound,
      message: "Student updated successfully",
    });
  }
  //assign Academic year
  if (academicYear) {
    studentFound.academicYear = academicYear;
    await studentFound.save();
    res.status(200).json({
      status: "success",
      data: studentFound,
      message: "Student updated successfully",
    });
  }
  //send response
  res.render("student/admin-update-student", {
    programs,
    classLevels,
    academicYears,
    program,
    classLevel,
    academicYear,
    name,
    email,
    prefectName,
    studentFound,
    res,
    throw: Error,
  });
});
