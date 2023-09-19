const AysncHandler = require("express-async-handler");
const AcademicYear = require("../../model/Academic/AcademicYear");
const Admin = require("../../model/Staff/Admin");
const { calculatePageRange } = require("../../utils/paginationUtils");

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
      return res.status(400).json({ error: "Academic year already exists" });
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
  const { search, page } = req.query;
  const limit = 10; // Number of categories to show per page
  const currentPage = parseInt(page) || 1;

  // Build the query based on the search term
  const query = {};
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  // Count the total number of categories matching the search filter
  const totalAcademicYears = await AcademicYear.countDocuments(query);

  // Calculate the total number of pages based on the limit
  const totalPages = Math.ceil(totalAcademicYears / limit);

  // Calculate the range of page numbers to display
  const range = 5;
  const { startPage, endPage } = calculatePageRange(
    currentPage,
    totalPages,
    range
  );

  // Get the categories for the current page
  const academicYears = await AcademicYear.find(query)
    .skip((currentPage - 1) * limit)
    .limit(limit);

  res.render("academic-years/index", {
    title: "Academic Years",
    academicYears: academicYears,
    search,
    currentPage,
    totalPages,
    currentPageEntries: academicYears.length,
    totalEntries: totalAcademicYears,
    hasPreviousPage: currentPage > 1,
    previousPage: currentPage - 1,
    hasNextPage: currentPage < totalPages,
    nextPage: currentPage + 1,
    pages: Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    ),
  });
};
//@desc  get single Academic Year
//@route GET /api/v1/academic-years/:id
//@acess  Private
exports.getAcademicYear = async (req, res) => {
  try {
    const academicYear = await AcademicYear.findById(req.params.id);
    if (!academicYear) {
      return res.status(400).json({ error: "Academic year already exists" });
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
      return res.status(400).json({ error: "Academic year already exists" });
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
  await AcademicYear.findByIdAndDelete(req.params.id);
  res.redirect("/academic-years/index"); // Redirect to the class levels list or any other desired page
};
