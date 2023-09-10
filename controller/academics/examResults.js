const AsyncHandler = require("express-async-handler");
const ExamResult = require("../../model/Academic/ExamResults");
const Student = require("../../model/Academic/Student");
const { calculatePageRange } = require("../../utils/paginationUtils");

//@desc  Exam results checking
//@route POST /api/v1/exam-results/:id/checking
//@acess  Private - Students only

exports.checkExamResults = AsyncHandler(async (req, res) => {
  //find the student
  const studentFound = await Student.findById(req.userAuth?._id);
  if (!studentFound) {
    throw new Error("No Student Found");
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
  console.log(studentId);

  // Find all exam results for the specified student
  const results = await ExamResult.find({ student: studentId })
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
  // Find all exam results for the specified student
  const results = await ExamResult.find()
    .populate("academicYear", "name")
    .populate("academicTerm", "name")
    .populate("classLevel", "name")
    .populate("exam", "name")
    .populate("student", "name");

  res.render("exam-result/index_admin", {
    status: "success",
    message: "Exam Results fetched",
    data: results,
  });
});

exports.deleteExamResult = AsyncHandler(async (req, res) => {
  await ExamResult.findByIdAndDelete(req.params.id);
  res.redirect("/exam-result/index_admin"); // Redirect to the list or any other desired page
});

exports.publishExamResult = async (req, res) => {
  try {
    console.log("Entering publishExamResult");

    const examResultId = req.params.id;
    const action = req.body.action;

    // Log the action to see what value it has
    console.log("Action:", action);

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
    console.error(error.message);
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
      throw new Error("Exam result not found");
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
