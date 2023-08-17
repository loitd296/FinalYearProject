const AsyncHandler = require("express-async-handler");
const Student = require("../../model/Academic/Student");
const Program = require("../../model/Academic/Program");
const ClassLevel = require("../../model/Academic/ClassLevel"); // Import the ClassLevel model
const AcademicYear = require("../../model/Academic/AcademicYear"); // Import the AcademicYear model
const Exam = require("../../model/Academic/Exam");
const ExamResult = require("../../model/Academic/ExamResults");

const { hashPassword, isPassMatched } = require("../../utils/helpers");
const jwt = require("jsonwebtoken");
const { calculatePageRange } = require("../../utils/paginationUtils");

//@desc  Admin Register Student
//@route POST /api/students/admin/register
//@acess  Private Admin only

exports.adminRegisterStudent = AsyncHandler(async (req, res) => {
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
  res.redirect("/student/index");
});

//@desc    login  student
//@route   POST /api/v1/students/login
//@access  Public

exports.loginStudent = AsyncHandler(async (req, res) => {
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

    res.redirect("/student/profile");
  }
});

// Student Logout
exports.studentLogoutCtrl = (req, res) => {
  // Clear the token cookie
  res.clearCookie("token");

  // Redirect to the login page
  res.redirect("/student/login");
};

//@desc    Get all Students
//@route   GET /api/v1/admin/students
//@access  Private admin only

exports.getAllStudentsByAdmin = AsyncHandler(async (req, res) => {
  const students = await Student.find();
  res.render("student/index", {
    title: "Teachers",
    students: students,
  });
});

//@desc    Get Single Student
//@route   GET /api/v1/students/:studentID/admin
//@access  Private admin only

exports.getStudentByAdmin = AsyncHandler(async (req, res) => {
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

exports.studentUpdateProfile = AsyncHandler(async (req, res) => {
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

exports.adminUpdateStudent = AsyncHandler(async (req, res) => {
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

exports.renderSelectExam = async (req, res) => {
  try {
    const exams = await Exam.find()
      .populate("academicYear", "name")
      .populate("academicTerm", "name")
      .populate("classLevel", "name")
      .populate("subject", "name")
      .populate("program", "name");
    res.render("student/selectExam", {
      exams,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve exams" });
  }
};

exports.writeExam = async (req, res) => {
  try {
    // Get student
    const studentFound = await Student.findById(req.userAuth?._id);
    if (!studentFound) {
      throw new Error("Student not found");
    }

    // Get exam
    const examFound = await Exam.findById(req.params.examID)
      .populate("questions")
      .populate("academicTerm");

    if (!examFound) {
      throw new Error("Exam not found");
    }

    const examDuration = examFound.duration;
    const [hours, minutes] = examDuration.split(":");
    const examEndTime = new Date();
    examEndTime.setMinutes(
      examEndTime.getMinutes() + parseInt(hours) * 60 + parseInt(minutes)
    );

    // Store the exam end time in the student's session
    req.session.examEndTime = examEndTime.getTime();
    req.session.save();

    // Render the exam page with questions
    res.render("student/student-take-exam", {
      exam: examFound,
      student: studentFound,
      examEndTime: examEndTime.toISOString(),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve exam" });
  }
};

exports.submitExam = async (req, res) => {
  try {
    const studentId = req.userAuth?._id;
    const examId = req.params.examID;

    // Check if the student exists
    const student = await Student.findById(studentId);
    if (!student) {
      throw new Error("Student not found");
    }

    // Check if the exam exists and populate related data
    const exam = await Exam.findById(examId)
      .populate("questions")
      .populate("academicTerm");
    if (!exam) {
      throw new Error("Exam not found");
    }

    // Get questions and student's answers
    const questions = exam.questions;
    const studentAnswers = req.body.answers;

    // Check if the student has already taken the exam
    const existingResult = await ExamResult.findOne({
      student: studentId,
      exam: examId,
    });
    if (existingResult) {
      throw new Error("You have already taken this exam");
    }

    // Check if the student is suspended/withdrawn
    if (student.isWithdrawn || student.isSuspended) {
      throw new Error("You are suspended/withdrawn and cannot take this exam");
    }

    // Calculate exam result
    let correctAnswers = 0;
    let score = 0;
    const answeredQuestions = [];

    questions.forEach((question, index) => {
      const studentAnswer = studentAnswers[index];
      const isCorrect = question.correctAnswer === studentAnswer;

      if (isCorrect) {
        correctAnswers++;
        score++;
      }

      answeredQuestions.push({
        question: question.question,
        correctAnswer: question.correctAnswer,
        isCorrect,
      });
    });

    const totalQuestions = questions.length;
    const grade = (correctAnswers / totalQuestions) * 100;
    const status = grade >= 50 ? "passed" : "failed";
    const remarks =
      grade >= 80 ? "Distinction" : grade >= 70 ? "Merit" : "Pass";

    // Check if the user answered all questions or the time limit has expired
    const hasAnsweredAllQuestions = studentAnswers.length === questions.length;
    const isTimeExpired = exam.timeLimit < new Date();

    // Create exam result document
    const examResult = await ExamResult.create({
      student: studentId,
      exam: examId,
      grade,
      score,
      status,
      remarks,
      position: 0, // Provide a value for the position field if needed
      subject: exam.subject,
      classLevel: exam.classLevel,
      academicTerm: exam.academicTerm,
      academicYear: exam.academicYear,
      isPublished: false,
      answeredQuestions,
    });

    // Update student's exam results and class level if all questions are answered or time has expired
    if (hasAnsweredAllQuestions || isTimeExpired) {
      student.examResults.push(examResult._id);
      if (
        exam.academicTerm.name === "3rd term" &&
        status === "passed" &&
        ["Level 100", "Level 200", "Level 300"].includes(
          student.currentClassLevel
        )
      ) {
        const nextClassLevel = `Level ${
          parseInt(student.currentClassLevel.split(" ")[1]) + 100
        }`;
        student.classLevels.push(nextClassLevel);
        student.currentClassLevel = nextClassLevel;
      } else if (
        exam.academicTerm.name === "3rd term" &&
        status === "passed" &&
        student.currentClassLevel === "Level 400"
      ) {
        student.isGraduated = true;
        student.yearGraduated = new Date();
      }
      await student.save();
    }

    res.status(200).json({
      status: "success",
      data: "You have submitted your exam. Check later for the results",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
