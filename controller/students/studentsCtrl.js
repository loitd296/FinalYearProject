const AsyncHandler = require("express-async-handler");
const Student = require("../../model/Academic/Student");
const Program = require("../../model/Academic/Program");
const ClassLevel = require("../../model/Academic/ClassLevel"); // Import the ClassLevel model
const AcademicYear = require("../../model/Academic/AcademicYear"); // Import the AcademicYear model
const Exam = require("../../model/Academic/Exam");
const ExamResult = require("../../model/Academic/ExamResults");

const generateToken = require("../../utils/generateToken");
const { hashPassword, isPassMatched } = require("../../utils/helpers");
const jwt = require("jsonwebtoken");

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
  res.status(201).json({
    status: "success",
    message: "Student registered successfully",
    data: studentRegistered,
  });
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
  // Get student
  try {
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
    const examEndTime = req.session.examEndTime;
    const currentTime = new Date().getTime();

    // Check if the exam time has expired
    if (currentTime > examEndTime) {
      // Get questions
      const questions = examFound?.questions;
      // Get student's answers
      const studentAnswers = req.body.answers;

      // Check if student answered all questions
      if (studentAnswers.length !== questions.length) {
        throw new Error("You have not answered all the questions");
      }

      // Check if student has already taken the exam
      const studentFoundInResults = await ExamResult.findOne({
        student: studentFound?._id,
        exam: examFound?._id,
      });
      if (studentFoundInResults) {
        throw new Error("You have already written this exam");
      }

      // Check if student is suspended/withdrawn
      if (studentFound.isWithdrawn || studentFound.isSuspended) {
        throw new Error(
          "You are suspended/withdrawn, you can't take this exam"
        );
      }

      // Build report object
      let correctAnswers = 0;
      let wrongAnswers = 0;
      let status = ""; // failed/passed
      let grade = 0;
      let remarks = "";
      let score = 0;
      let answeredQuestions = [];

      // Check answers
      for (let i = 0; i < questions.length; i++) {
        // Find the question
        const question = questions[i];
        // Check if the answer is correct
        if (question.correctAnswer === studentAnswers[i]) {
          correctAnswers++;
          score++;
          question.isCorrect = true;
        } else {
          wrongAnswers++;
        }
      }

      // Calculate report values
      const totalQuestions = questions.length;
      grade = (correctAnswers / totalQuestions) * 100;
      answeredQuestions = questions.map((question) => {
        return {
          question: question.question,
          correctanswer: question.correctAnswer,
          isCorrect: question.isCorrect,
        };
      });

      // Calculate status
      if (grade >= 50) {
        status = "passed";
      } else {
        status = "failed";
      }

      // Remarks
      if (grade >= 80) {
        remarks = "Excellent";
      } else if (grade >= 70) {
        remarks = "Very Good";
      } else if (grade >= 60) {
        remarks = "Good";
      } else if (grade >= 50) {
        remarks = "Fair";
      } else {
        remarks = "Poor";
      }

      // Generate ExamResult document
      const examResult = await ExamResult.create({
        student: studentFound?._id,
        exam: examFound?._id,
        grade,
        score,
        status,
        remarks,
        position: 0, // Provide a value for the position field if needed
        subject: examFound?.subject,
        classLevel: examFound?.classLevel,
        academicTerm: examFound?.academicTerm,
        academicYear: examFound?.academicYear,
        isPublished: false,
        answeredQuestions: answeredQuestions,
      });

      // Push the results into the student's examResults array
      studentFound.examResults.push(examResult._id);
      await studentFound.save();

      // Promoting
      if (
        examFound.academicTerm.name === "3rd term" &&
        status === "passed" &&
        studentFound?.currentClassLevel === "Level 100"
      ) {
        studentFound.classLevels.push("Level 200");
        studentFound.currentClassLevel = "Level 200";
        await studentFound.save();
      } else if (
        examFound.academicTerm.name === "3rd term" &&
        status === "passed" &&
        studentFound?.currentClassLevel === "Level 200"
      ) {
        studentFound.classLevels.push("Level 300");
        studentFound.currentClassLevel = "Level 300";
        await studentFound.save();
      } else if (
        examFound.academicTerm.name === "3rd term" &&
        status === "passed" &&
        studentFound?.currentClassLevel === "Level 300"
      ) {
        studentFound.classLevels.push("Level 400");
        studentFound.currentClassLevel = "Level 400";
        await studentFound.save();
      } else if (
        examFound.academicTerm.name === "3rd term" &&
        status === "passed" &&
        studentFound?.currentClassLevel === "Level 400"
      ) {
        studentFound.isGraduated = true;
        studentFound.yearGraduated = new Date();
        await studentFound.save();
      }

      // Clear the exam end time from the student's session
      delete req.session.examEndTime;
      req.session.save();

      res.status(200).json({
        status: "success",
        data: "You have submitted your exam. Check later for the results",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
