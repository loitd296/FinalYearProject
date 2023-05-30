const asyncHandler = require("express-async-handler");
const YearGroup = require("../../model/Academic/YearGroup");
const Admin = require("../../model/Staff/Admin");
const AcademicYear = require("../../model/Academic/AcademicYear");

//@desc  Create year group
//@route POST /api/v1/year-groups
//@acess  Private

exports.createYearGroup = asyncHandler(async (req, res) => {
  const { name, academicYear } = req.body;

  // Check if the year group already exists
  const existingYearGroup = await YearGroup.findOne({ name });
  if (existingYearGroup) {
    throw new Error("Year Group/Graduation already exists");
  }

  // Fetch all academic years
  const academicYears = await AcademicYear.find();

  // Create the year group
  const yearGroup = await YearGroup.create({
    name,
    academicYear,
    createdBy: req.userAuth._id,
  });

  // Render the createYearGroup template with the form values
  res.render("year-group/createYearGroup", {
    title: "Create Year Group",
    yearGroup: { name, academicYear }, // Pass the submitted form values as an object
    academicYears: academicYears,
  });
});

exports.searchYearGroups = asyncHandler(async (req, res) => {
  const searchQuery = req.query.search;
  const yearGroups = await YearGroup.find({
    name: { $regex: searchQuery, $options: "i" },
  });
  console.log(yearGroups);
  res.render("year-group/index", {
    title: "Year Group",
    yearGroup: yearGroups,
  });
});

//@desc  get all Year grups
//@route GET /api/v1/year-groups
//@acess  Private

exports.getYearGroups = asyncHandler(async (req, res) => {
  const yearGroup = await YearGroup.find().populate("academicYear", "name");
  res.render("year-group/index", {
    title: "Subject",
    yearGroup: yearGroup,
  });
});

//@desc  get single year group
//@route GET /api/v1/year-group/:id
//@acess  Private

exports.getYearGroup = asyncHandler(async (req, res) => {
  const yearGroup = await YearGroup.findById(req.params.id).populate(
    "academicYear",
    "name"
  );

  res.render("year-group/yearGroup", {
    title: "Subject",
    yearGroup: yearGroup,
  });
});

//@desc   Update  Year Group
//@route  PUT /api/v1/year-groups/:id
//@acess  Private

exports.updateYearGroup = asyncHandler(async (req, res) => {
  const { name, academicYear } = req.body;
  const yearGroupFound = await YearGroup.findOne({ name });

  if (yearGroupFound && yearGroupFound._id != req.params.id) {
    throw new Error("Year Group already exists");
  }

  const academicYears = await AcademicYear.find();

  const yearGroup = await YearGroup.findByIdAndUpdate(
    req.params.id,
    {
      name,
      academicYear,
      createdBy: req.userAuth._id,
    },
    {
      new: true,
    }
  );

  // Check if the update was successful
  if (yearGroup && name && academicYear) {
    // If successful, redirect to the index page
    res.redirect("/year-group/index");
  } else {
    // If not successful, render the update page again with old values and options
    res.render("year-group/updateYearGroup", {
      title: "Update Year Group",
      yearGroup: yearGroup,
      academicYears: academicYears,
      oldAcademicYear: yearGroup.academicYear,
    });
  }
});

//@desc   Delete  Year group
//@route  PUT /api/v1/year-groups/:id
//@acess  Private
exports.deleteYearGroup = asyncHandler(async (req, res) => {
  const yearGroup = await YearGroup.findById(req.params.id);
  if (!yearGroup) {
    throw new Error("Subject not found");
  }

  await YearGroup.deleteOne({ _id: req.params.id });

  res.redirect("/year-group/index"); // Redirect to the list or any other desired page
});
