const AysncHandler = require("express-async-handler");
const AcademicYear = require("../../model/Academic/AcademicYear");
const Admin = require("../../model/Staff/Admin");

//@desc Create Academic Year
//@route POST /academic-years/createAcademicYear
//@acess  Private
// academicYearCtrl.js
exports.createAcademicYear = async (req, res) => {
  try {
    const { name, fromYear, toYear } = req.body;
    //check if exists
    const academicYear = await AcademicYear.findOne({ name });
    if (academicYear) {
      throw new Error("Academic year already exists");
    }
    //create
    const academicYearCreated = await AcademicYear.create({
      name,
      fromYear,
      toYear,
      createdBy: req.userAuth._id,
    });
    //push academic into admin
    const admin = await Admin.findById(req.userAuth._id);
    admin.academicYears.push(academicYearCreated._id);
    await admin.save();

    // Redirect to the dashboard page
    res.redirect("/academic-years/index");
  } catch (error) {
    res.json({ status: "failed", error: error.message });
  }
};

//@desc  get all Academic Years
//@route GET /api/v1/academic-years
//@acess  Private
exports.getAcademicYears = async (req, res) => {
  const academicYears = await AcademicYear.find().select(
    "name fromYear toYear createdBy createdAt"
  );
  console.log(academicYears);

  res.render("academic-years/index", {
    title: "Academic Years",
    academicYears: academicYears,
  });
};
//@desc  get single Academic Year
//@route GET /api/v1/academic-years/:id
//@acess  Private
exports.getAcademicYear = async (req, res) => {
  try {
    const academicYear = await AcademicYear.findById(req.params.id);
    if (!academicYear) {
      throw new Error("Academic year not found");
    }
    res.render("academic-years/academicYear", {
      title: "Academic Year",
      academicYear: academicYear,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

//@desc  get single Academic Year
//@route GET /api/v1/academic-years/:id
//@acess  Private
exports.searchAcademicYears = AysncHandler(async (req, res) => {
  const searchQuery = req.query.search;
  const academicYears = await AcademicYear.find({
    name: { $regex: searchQuery, $options: "i" },
  });

  res.render("academic-years/index", {
    title: "Academic Years",
    academicYears: academicYears,
  });
});

//@desc   Update  Academic Year
//@route  PUT /api/v1/academic-years/:id
//@acess  Private
exports.updateAcademicYear = async (req, res) => {
  try {
    // Retrieve the data from the request body
    const { name, fromYear, toYear } = req.body;
    const academicYearId = req.params.id; // Retrieve the academic year ID from the request parameters

    // Check if the academic term with the same name already exists
    const existingAcademicYear = await AcademicYear.findOne({ name });
    if (existingAcademicYear) {
      throw new Error("Academic term already exists");
    }

    // Find and update the academic year by ID
    const academicYear = await AcademicYear.findByIdAndUpdate(
      academicYearId,
      {
        name,
        fromYear,
        toYear,
        createdBy: req.userAuth._id,
      },
      { new: true }
    );

    // Render the updateAcademicYear template with the updated academicYear data
    res.render("academic-years/updateAcademicYear", {
      title: "Update Academic Year",
      academicYear: academicYear,
    });
    if (academicYear && name && fromYear && toYear) {
      res.redirect("/academic-years/index");
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

//@desc   Update  Academic Year
//@route  PUT /api/v1/academic-years/:id
//@acess  Private
exports.deleteAcademicYear = async (req, res) => {
  try {
    const academicYearId = req.params.id;

    // Find the academic year by ID
    const academicYear = await AcademicYear.findById(academicYearId);

    if (!academicYear) {
      throw new Error("Academic year not found");
    }

    // Perform any additional checks or validations before deleting the academic year

    // Delete the academic year
    await AcademicYear.findByIdAndDelete(academicYearId);

    // Redirect to the academic years index page
    res.redirect("/academic-years/index");
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
