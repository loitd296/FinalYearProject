const AysncHandler = require("express-async-handler");
const Exam = require("../../model/Academic/Exam");
const Teacher = require("../../model/Staff/Teacher");
const Subject = require("../../model/Academic/Subject");
const Program = require("../../model/Academic/Program");
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
  // Validate program object ID
  const programExists = await Program.findById(program);
  if (!programExists) {
    throw new Error("Invalid program");
  }

  // Create exam
  const examCreated = new Exam({
    name,
    description,
    subject,
    program: programExists._id,
    academicTerm,
    duration,

    academicYear,
    classLevel,
    createdBy,
    examDate,
    examTime,
    examType,
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
  const exams = await Exam.find()
    .populate("academicYear", "name")
    .populate("academicTerm", "name")
    .populate("classLevel", "name")
    .populate("examType", "name")
    .populate("subject", "name")
    .populate("program", "name");
  res.render("exam/index", { exams: exams });
});

//@desc  get single exam
//@route GET /api/v1/exams/:id
//@acess  Private Teahers only

exports.getExam = AysncHandler(async (req, res) => {
  const exam = await Exam.findById(req.params.id)
    .populate("academicYear", "name")
    .populate("academicTerm", "name")
    .populate("classLevel", "name")
    .populate("examType", "name")
    .populate("subject", "name")
    .populate("program", "name");
  res.render("exam/exam", {
    title: "exam",
    exam: exam,
  });
});

exports.searchExams = AysncHandler(async (req, res) => {
  try {
    const searchQuery = req.query.search;
    const exams = await Exam.find({
      name: { $regex: searchQuery, $options: "i" },
    })
      .populate("academicYear", "name")
      .populate("academicTerm", "name")
      .populate("classLevel", "name")
      .populate("examType", "name")
      .populate("subject", "name")
      .populate("program", "name");

    console.log("Search Query:", searchQuery);
    console.log("Search Results:", exams);

    res.render("exam/index", {
      title: "exam",
      exams: exams,
    });
  } catch (error) {
    // Handle any other errors that may occur during the search
    console.error(error);
    res
      .status(500)
      .json({ status: "failed", message: "Failed to search exams" });
  }
});

//@desc   Update  Exam
//@route  PUT /api/v1/exams/:id
//@acess  Private  - Teacher only
exports.renderUpdateExam = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id)
      .populate("subject")
      .populate("program")
      .populate("academicTerm")
      .populate("academicYear")
      .populate("classLevel");

    const subjects = await Subject.find();
    const programs = await Program.find();
    const academicTerms = await AcademicTerm.find();
    const academicYears = await AcademicYear.find();
    const classLevels = await ClassLevel.find();

    res.render("exam/updateExam", {
      title: "Update Exam",
      exam,
      subjects,
      programs,
      academicTerms,
      academicYears,
      classLevels,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

exports.updateExam = AysncHandler(async (req, res) => {
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

  // Fetch the existing exam
  const examFound = await Exam.findById(req.params.id);
  if (!examFound) {
    throw new Error("Exam not found");
  }

  // Check if the name already exists for another exam
  const existingExam = await Exam.findOne({
    name,
    _id: { $ne: examFound._id },
  });
  if (existingExam) {
    throw new Error("Exam name already exists");
  }

  // Update the exam
  examFound.name = name;
  examFound.description = description;
  examFound.subject = subject;
  examFound.program = program;
  examFound.academicTerm = academicTerm;
  examFound.duration = duration;
  examFound.examDate = examDate;
  examFound.examTime = examTime;
  examFound.examType = examType;
  examFound.createdBy = createdBy;
  examFound.academicYear = academicYear;
  examFound.classLevel = classLevel;
  examFound.createdBy = req.userAuth._id;

  // Save the updated exam
  const examUpdated = await examFound.save();

  res.render("exam/updateExam", {
    title: "Update Exam",
    exam: examUpdated,
  });
});
