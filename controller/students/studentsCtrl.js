const AsyncHandler = require("express-async-handler");
const dialogflow = require("dialogflow");

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
    return res.status(404).json({ error: "Student already employed" });
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
    return res.redirect("/student/login");
  }
  // Verify the password
  const isMatched = await isPassMatched(password, student?.password);
  if (!isMatched) {
    return res.redirect("/student/login");
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
  try {
    const { page } = req.query;
    const limit = 10; // Number of students to show per page
    const currentPage = parseInt(page) || 1;

    // Count the total number of students
    const totalStudents = await Student.countDocuments({});

    // Calculate the total number of pages based on the limit
    const totalPages = Math.ceil(totalStudents / limit);

    // Calculate the range of page numbers to display
    const range = 5;
    const { startPage, endPage } = calculatePageRange(
      currentPage,
      totalPages,
      range
    );

    // Get the students for the current page
    const students = await Student.find()
      .skip((currentPage - 1) * limit)
      .limit(limit);

    res.render("student/index", {
      title: "Student List",
      students,
      currentPage,
      totalPages,
      currentPageEntries: students.length,
      totalEntries: totalStudents,
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
    console.error("Error retrieving students:", err);
    res.render("student/index", {
      title: "Student List",
      students: [],
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

//@desc    Get Single Student
//@route   GET /api/v1/students/:studentID/admin
//@access  Private admin only

exports.getStudentByAdmin = AsyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
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
    return res.status(404).json({ error: "This email is taken/exist" });
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

  // Find the student by id
  const studentFound = await Student.findById(req.params.id);
  if (!studentFound) {
    return res.status(404).json({ error: "Student not found" });
  }

  // Fetch programs, class levels, academic years, and subjects from the database
  const programs = await Program.find();
  const classLevels = await ClassLevel.find();
  const academicYears = await AcademicYear.find();

  // Update student data if provided
  if (name) {
    studentFound.name = name;
  }
  if (email) {
    studentFound.email = email;
  }
  if (prefectName) {
    studentFound.prefectName = prefectName;
  }
  if (program) {
    studentFound.program = program;
  }
  if (classLevel) {
    studentFound.classLevels = classLevel;
  }
  if (academicYear) {
    studentFound.academicYear = academicYear;
  }

  // Save the updated student data
  await studentFound.save();
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
    const { program, classLevels } = await Student.findById(req.userAuth._id)
      .populate("program")
      .exec();

    const exams = await Exam.find({
      program: program._id,
      classLevel: classLevels,
    })
      .populate("academicYear", "name")
      .populate("academicTerm", "name")
      .populate("classLevel", "name")
      .populate("subject", "name")
      .populate("program", "name");

    // Function to limit character count for the exam name
    const limitCharacterCount = (exams) => {
      const charLimit = 12; // Change this to your desired limit
      exams.forEach((exam) => {
        if (exam.name.length > charLimit) {
          exam.name = exam.name.slice(0, charLimit) + "...";
        }
      });

      return exams;
    };

    // Filter out exams that have examDate in the future
    const currentDate = new Date();
    const limitedExams = limitCharacterCount(
      exams.filter((exam) => new Date(exam.examDate) <= currentDate)
    );

    res.render("student/selectExam", {
      exams: limitedExams,
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
      return res.status(404).json({ error: "Student not found" });
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
      accessKey: examFound.accessKey,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve exam" });
  }
};

function normalizeAnswer(answer) {
  // Remove spaces, periods, and convert to lowercase
  return answer.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}

exports.submitExam = async (req, res) => {
  try {
    const studentId = req.userAuth?._id;
    const examId = req.params.examID;

    // Check if the student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Check if the exam exists and populate related data
    const exam = await Exam.findById(examId)
      .populate("questions")
      .populate("academicTerm");
    if (!exam) {
      return res.status(404).json({ error: "Exam not found" });
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
      return res
        .status(404)
        .json({ error: "You have already taken this exam" });
    }

    // Check if the student is suspended/withdrawn
    if (student.isWithdrawn || student.isSuspended) {
      return res.status(404).json({
        error: "You are suspended/withdrawn and cannot take this exam",
      });
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

    res.redirect("/student/profile");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
