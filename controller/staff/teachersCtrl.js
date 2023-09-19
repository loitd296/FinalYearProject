const AsyncHandler = require("express-async-handler");
const Teacher = require("../../model/Staff/Teacher");
const Program = require("../../model/Academic/Program");
const ClassLevel = require("../../model/Academic/ClassLevel"); // Import the ClassLevel model
const AcademicYear = require("../../model/Academic/AcademicYear"); // Import the AcademicYear model
const Subject = require("../../model/Academic/Subject"); // Import the Subject model

const { hashPassword, isPassMatched } = require("../../utils/helpers");
const jwt = require("jsonwebtoken");

const { calculatePageRange } = require("../../utils/paginationUtils");

//@desc  Admin Register Teacher
//@route POST /api/teachers/admin/register
//@acess  Private

exports.adminRegisterTeacher = AsyncHandler(async (req, res) => {
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

exports.loginTeacher = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //find the  user
  const teacher = await Teacher.findOne({ email });
  if (!teacher) {
    return res.redirect("/teacher/login");
  }
  //verify the password
  const isMatched = await isPassMatched(password, teacher.password);
  if (isMatched) {
    // Generate JWT token
    const token = jwt.sign(
      { _id: teacher._id.toString(), role: "teacher" },
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

exports.getAllTeachersAdmin = AsyncHandler(async (req, res) => {
  try {
    const { page } = req.query;
    const limit = 10; // Number of teachers to show per page
    const currentPage = parseInt(page) || 1;

    // Count the total number of teachers
    const totalTeachers = await Teacher.countDocuments({});

    // Calculate the total number of pages based on the limit
    const totalPages = Math.ceil(totalTeachers / limit);

    // Calculate the range of page numbers to display
    const range = 5;
    const { startPage, endPage } = calculatePageRange(
      currentPage,
      totalPages,
      range
    );

    // Get the teachers for the current page
    const teachers = await Teacher.find()
      .skip((currentPage - 1) * limit)
      .limit(limit);

    res.render("teacher/index", {
      title: "Teacher List",
      teachers,
      currentPage,
      totalPages,
      currentPageEntries: teachers.length,
      totalEntries: totalTeachers,
      hasPreviousPage: currentPage > 1,
      previousPage: currentPage - 1,
      hasNextPage: currentPage < totalPages,
      nextPage: currentPage + 1,
      pages: Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      ),
    });
  } catch (err) {
    res.render("teacher/index", {
      title: "Teacher List",
      message: "Invalid login credentials",
      teachers: [],
      currentPage: 1,
      totalPages: 1,
      currentPageEntries: 0,
      totalEntries: 0,
      hasPreviousPage: false,
      previousPage: 0,
      hasNextPage: false,
      nextPage: 0,
      pages: [],
    });
  }
});

//@desc    Get Single Teacher
//@route   GET /api/v1/teachers/:teacherID/admin
//@access  Private admin only

exports.getTeacherByAdmin = AsyncHandler(async (req, res) => {
  //find the teacher
  const teacher = await Teacher.findById(req.params.id);
  if (!teacher) {
    return res.status(404).json({ error: "Teacher not found" });
  }
  res.render("teacher/teacher", {
    title: "Teacher",
    teacher: teacher,
  });
});

//@desc    Teacher Profile
//@route   GET /api/v1/teachers/profile
//@access  Private Teacher only

exports.getTeacherProfile = AsyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.userAuth?._id).select(
    "-password -createdAt -updatedAt"
  );
  if (!teacher) {
    return res.status(404).json({ error: "Teacher not found" });
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

exports.teacherUpdateProfile = async (req, res) => {
  const { email, name, password } = req.body;
  const userId = req.userAuth._id;

  try {
    // Check if the email is being changed and if it's already taken
    if (email !== req.userAuth.email) {
      const emailExists = await Teacher.exists({ email });
      if (emailExists) {
        throw new Error("This email is already taken.");
      }
    }

    // Prepare update data
    const updateData = { email, name };
    if (password) {
      updateData.password = await hashPassword(password);
    }

    // Update the profile
    const updatedTeacher = await Teacher.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    // Render the updated profile
    res.render("teacher/teacher-profile", {
      data: updatedTeacher,
      myMiddlewareProperty: res.locals.isTeacher,
      loggedIn: res.locals.loggedIn,
      teacher: updatedTeacher.role,
    });
  } catch (error) {
    // Handle errors and provide appropriate response
    console.error(error);
    res.status(400).send(error.message);
  }
};

//@desc     Admin updating Teacher profile
//@route    UPDATE /api/v1/teachers/:teacherID/admin
//@access   Private Admin only

exports.adminUpdateTeacher = AsyncHandler(async (req, res) => {
  const { program, classLevel, academicYear, subject } = req.body;
  //if email is taken

  const teacherFound = await Teacher.findById(req.params.id);
  console.log(teacherFound);
  if (!teacherFound) {
    return res.status(404).json({ error: "Teacher not found" });
  }
  //Check if teacher is withdrawn
  if (teacherFound.isWitdrawn) {
    return res
      .status(404)
      .json({ error: "Action denied, teacher is withdraw" });
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
    res.redirect("/teacher/index");
  }

  //assign Class level
  if (classLevel) {
    teacherFound.classLevel = classLevel;
    await teacherFound.save();
    res.redirect("/teacher/index");
  }

  //assign Academic year
  if (academicYear) {
    teacherFound.academicYear = academicYear;
    await teacherFound.save();
    res.redirect("/teacher/index");
  }

  //assign subject
  if (subject) {
    teacherFound.subject = subject;
    await teacherFound.save();
    res.redirect("/teacher/index");
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

exports.deleteTeacher = AsyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);
  if (!teacher) {
    return res.status(404).json({ error: "Teacher not found" });
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
