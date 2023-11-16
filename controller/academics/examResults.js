const AsyncHandler = require("express-async-handler");
const ExamResult = require("../../model/Academic/ExamResults");
const Student = require("../../model/Academic/Student");
const AcademicTerm = require("../../model/Academic/AcademicTerm");
const AcademicYear = require("../../model/Academic/AcademicYear");
const Exam = require("../../model/Academic/Exam");
const ClassLevel = require("../../model/Academic/ClassLevel");

const { calculatePageRange } = require("../../utils/paginationUtils");

//@desc  Exam results checking
//@route POST /api/v1/exam-results/:id/checking
//@acess  Private - Students only

exports.checkExamResults = AsyncHandler(async (req, res) => {
  //find the student
  const studentFound = await Student.findById(req.userAuth?._id);
  if (!studentFound) {
    return res.status(400).json({ error: "No Student Found" });
  }
  //find the exam results
  const examResult = await ExamResult.findOne({
    studentID: studentFound?.studentId,
    _id: req.params.id,
  })
    .populate({
      path: "exam",
      populate: {
        path: "questions",
      },
    })
    .populate("classLevel")
    .populate("academicTerm")
    .populate("academicYear");
  //check if exam is published
  console.log(examResult);
  if (examResult?.isPublished === false) {
    throw new Error("Exam result is not available, check out later");
  }
  res.render("exam-result/student-check-result", {
    status: "success",
    message: "Exam result",
    data: examResult,
    student: studentFound,
  });
});

//@desc  Get all Exam results (name, id)
//@route POST /api/v1/exam-results
//@acess  Private - Students only

exports.getAllExamResults = AsyncHandler(async (req, res) => {
  const studentId = await Student.findById(req.userAuth?._id);

  // Find all exam results for the specified student
  const results = await ExamResult.find({
    student: studentId,
    isPublished: true,
  })
    .populate("academicYear", "name")
    .populate("academicTerm", "name")
    .populate("classLevel", "name")
    .populate("exam", "name")
    .populate("student", "name");

  res.render("exam-result/index", {
    status: "success",
    message: "Exam Results fetched",
    data: results,
  });
});

//@desc  Get all Exam results (name, id)
//@route POST /api/v1/exam-results
//@acess  Private - Students only

exports.adminExamResults = AsyncHandler(async (req, res) => {
  try {
    const { page, academicTerm, academicYear, search } = req.query;
    const limit = 10;
    const currentPage = parseInt(page) || 1;

    const query = {};

    if (academicTerm) {
      query.academicTerm = academicTerm;
    }

    if (academicYear) {
      query.academicYear = academicYear;
    }

    if (search) {
      const searchRegex = new RegExp(search, "i");
      const [students, exams, classLevels] = await Promise.all([
        Student.find({ name: searchRegex }),
        Exam.find({ name: searchRegex }),
        ClassLevel.find({ name: searchRegex }),
      ]);

      // Use the IDs of found students, exams, and class levels in the query
      query.$or = [
        { student: { $in: students.map((student) => student._id) } },
        { exam: { $in: exams.map((exam) => exam._id) } },
        {
          classLevel: { $in: classLevels.map((classLevel) => classLevel._id) },
        },
      ];
    }

    const totalExamResults = await ExamResult.countDocuments(query);
    const totalPages = Math.ceil(totalExamResults / limit);
    const range = 5;
    const { startPage, endPage } = calculatePageRange(
      currentPage,
      totalPages,
      range
    );

    const examResults = await ExamResult.find(query)
      .populate("student", "name")
      .populate("exam", "name")
      .populate("classLevel", "name")
      .populate("academicTerm", "name")
      .populate("academicYear", "name")
      .skip((currentPage - 1) * limit)
      .limit(limit);

    const academicTerms = await AcademicTerm.find();
    const academicYears = await AcademicYear.find();
    const classLevels = await ClassLevel.find();

    res.render("exam-result/index_admin", {
      title: "Exam Results List",
      data: examResults,
      currentPage,
      totalPages,
      currentPageEntries: examResults.length,
      totalEntries: totalExamResults,
      hasPreviousPage: currentPage > 1,
      previousPage: currentPage - 1,
      hasNextPage: currentPage < totalPages,
      nextPage: currentPage + 1,
      pages: Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      ),
      academicTerms,
      academicYears,
      classLevels,
      academicTermFilter: academicTerm,
      academicYearFilter: academicYear,
      classLevelFilter: req.query.classLevel,
      searchFilter: search,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

exports.deleteExamResult = AsyncHandler(async (req, res) => {
  await ExamResult.findByIdAndDelete(req.params.id);
  res.redirect("/exam-result/index_admin"); // Redirect to the list or any other desired page
});

exports.publishExamResult = async (req, res) => {
  try {
    const examResultId = req.params.id;
    const action = req.body.action;

    // Validate the action to ensure it's either "publish" or "unpublish"
    if (action !== "publish" && action !== "unpublish") {
      return res.status(400).json({
        status: "error",
        message: "Invalid action. Action must be 'publish' or 'unpublish'.",
      });
    }

    // Find the examResult document by ID
    const examResult = await ExamResult.findById(examResultId);

    if (!examResult) {
      return res.status(404).json({
        status: "error",
        message: "Exam result not found.",
      });
    }

    // Update the isPublished property based on the action
    if (action === "publish") {
      examResult.isPublished = true;
    } else if (action === "unpublish") {
      examResult.isPublished = false;
    }

    console.log("Exiting publishExamResult");

    await examResult.save();

    res.status(200).json({
      status: "success",
      message: `Exam result ${
        action === "publish" ? "published" : "unpublished"
      } successfully.`,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

//@desc  Admin publish exam results
//@route PUT /api/v1/exam-results/:id/admin-toggle-publish
//@acess  Private - Admin only

exports.adminToggleExamResult = async (req, res) => {
  try {
    const examResult = await ExamResult.findById(req.params.id);
    if (!examResult) {
      return res.status(400).json({ error: "Exam result not found" });
    }

    // Update the isPublished property of the exam result based on the request body
    examResult.isPublished = req.body.publish;
    await examResult.save();

    res.status(200).json({
      status: "success",
      message: "Exam Result Updated",
      data: examResult,
    });
  } catch (error) {
    // Handle error
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
