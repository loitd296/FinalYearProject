const AysncHandler = require("express-async-handler");
const Exam = require("../../model/Academic/Exam");
const Teacher = require("../../model/Staff/Teacher");
const Subject = require("../../model/Academic/Subject");
const Program = require("../../model/Academic/AcademicTerm");
const AcademicYear = require("../../model/Academic/AcademicYear");
const ClassLevel = require("../../model/Academic/ClassLevel");
const AcademicTerm = require("../../model/Academic/AcademicTerm");
//@desc  Create Exam
//@route POST /api/v1/exams
//@acess Private  Teachers only

exports.rendercreateExam = async (req, res) => {
  try {
    // Fetch programs, academic terms, academic years, class levels, and subjects from the database
    const programs = await Program.find();
    const academicTerms = await AcademicTerm.find();
    const academicYears = await AcademicYear.find();
    const classLevels = await ClassLevel.find();
    const subjects = await Subject.find();

    res.render("exam/createExam", {
      programs,
      academicTerms,
      academicYears,
      classLevels,
      subjects,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

exports.createExam = AysncHandler(async (req, res) => {
  const {
    name,
    description,
    subject,
    program,
    academicTerm,
    duration,
    examDate,
    examTime,
    examType,
    createdBy,
    academicYear,
    classLevel,
  } = req.body;
  // Find teacher
  const teacherFound = await Teacher.findById(req.userAuth?._id);
  if (!teacherFound) {
    throw new Error("Teacher not found");
  }

  // Check if exam already exists
  const examExists = await Exam.findOne({ name });
  if (examExists) {
    throw new Error("Exam already exists");
  }

  // Create exam
  const examCreated = new Exam({
    name,
    description,
    academicTerm,
    academicYear,
    classLevel,
    createdBy,
    duration,
    examDate,
    examTime,
    examType,
    subject,
    program,
    createdBy: req.userAuth?._id,
  });

  // Push the exam into teacher
  teacherFound.examsCreated.push(examCreated._id);

  // Save exam and teacher
  await examCreated.save();
  await teacherFound.save();
  res.status(201).json({
    status: "success",
    message: "Exam created",
    data: examCreated,
  });
});

//@desc  get all Exams
//@route GET /api/v1/exams
//@acess  Private

exports.getExams = AysncHandler(async (req, res) => {
  const exams = await Exam.find();
  res.status(201).json({
    status: "success",
    message: "Exams fetched successfully",
    data: exams,
  });
});

//@desc  get single exam
//@route GET /api/v1/exams/:id
//@acess  Private Teahers only

exports.getExam = AysncHandler(async (req, res) => {
  const exams = await Exam.findById(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Exam fetched successfully",
    data: exams,
  });
});

//@desc   Update  Exam
//@route  PUT /api/v1/exams/:id
//@acess  Private  - Teacher only

exports.updatExam = AysncHandler(async (req, res) => {
  const {
    name,
    description,
    subject,
    program,
    academicTerm,
    duration,
    examDate,
    examTime,
    examType,
    createdBy,
    academicYear,
    classLevel,
  } = req.body;
  //check name exists
  const examFound = await Exam.findOne({ name });
  if (examFound) {
    throw new Error("Exam already exists");
  }

  const examUpdated = await Exam.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      subject,
      program,
      academicTerm,
      duration,
      examDate,
      examTime,
      examType,
      createdBy,
      academicYear,
      classLevel,
      createdBy: req.userAuth._id,
    },
    {
      new: true,
    }
  );

  res.status(201).json({
    status: "success",
    message: "Exam  updated successfully",
    data: examUpdated,
  });
});
