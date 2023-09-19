const AsyncHandler = require("express-async-handler");
const AcademicTerm = require("../../model/Academic/AcademicTerm");
const Admin = require("../../model/Staff/Admin");
const { calculatePageRange } = require("../../utils/paginationUtils");

//@desc Create Academic Term Year
//@route POST /api/v1/academic-terms
//@acess  Private
exports.createAcademicTerm = AsyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;
  //check if exists
  const academicTerm = await AcademicTerm.findOne({ name });
  if (academicTerm) {
    return res.status(400).json({ error: "Academic term already exists" });
  }
  //create
  const academicTermCreated = await AcademicTerm.create({
    name,
    description,
    duration,
    createdBy: req.userAuth._id,
  });
  //push academic into admin
  const admin = await Admin.findById(req.userAuth._id);
  admin.academicTerms.push(academicTermCreated._id);
  await admin.save();
  // Redirect to the dashboard page
  res.redirect("/academic-term/index");
});

//@desc  get all Academic terms
//@route GET /api/v1/academic-terms
//@acess  Private
exports.getAcademicTerms = AsyncHandler(async (req, res) => {
  try {
    const { search, page } = req.query;
    const limit = 10; // Number of categories to show per page
    const currentPage = parseInt(page) || 1;

    // Build the query based on the search term
    const query = {};
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // Count the total number of categories matching the search filter
    const totalAcademicTerms = await AcademicTerm.countDocuments(query);

    // Calculate the total number of pages based on the limit
    const totalPages = Math.ceil(totalAcademicTerms / limit);

    // Calculate the range of page numbers to display
    const range = 5;
    const { startPage, endPage } = calculatePageRange(
      currentPage,
      totalPages,
      range
    );

    // Get the categories for the current page
    const academicTerms = await AcademicTerm.find(query)
      .skip((currentPage - 1) * limit)
      .limit(limit);

    res.render("academic-term/index", {
      title: "Category List",
      academicTerms,
      search,
      currentPage,
      totalPages,
      currentPageEntries: academicTerms.length,
      totalEntries: totalAcademicTerms,
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
    res.render("academic-term/index", {
      title: "Academic Terms List",
      categories: [],
      search: "",
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

//@desc  get single Academic term
//@route GET /api/v1/academic-terms/:id
//@acess  Private
exports.getAcademicTerm = AsyncHandler(async (req, res) => {
  const academicTerm = await AcademicTerm.findById(req.params.id);

  res.render("academic-term/academicTerm", {
    title: "Academic Term",
    academicTerm: academicTerm,
  });
});

//@desc  get single Academic Year
//@route GET /api/v1/academic-years/:id
//@acess  Private
exports.searchAcademicTerms = AsyncHandler(async (req, res) => {
  const searchQuery = req.query.search;
  const academicTerms = await AcademicTerm.find({
    name: { $regex: searchQuery, $options: "i" },
  });

  res.render("academic-term/index", {
    title: "Academic Terms",
    academicTerms: academicTerms,
  });
});

//@desc   Update  Academic term
//@route  PUT /api/v1/academic-terms/:id
//@acess  Private
exports.updateAcademicTerms = async (req, res) => {
  try {
    const { name, description, duration } = req.body;
    const academicTermId = req.params.id;

    // Check if the academic term with the same name already exists
    const existingAcademicTerm = await AcademicTerm.findOne({ name });
    if (existingAcademicTerm) {
      return res.status(400).json({ error: "Academic term already exists" });
    }

    // Find and update the academic term by ID
    const academicTerm = await AcademicTerm.findByIdAndUpdate(
      academicTermId,
      {
        name,
        description,
        duration,
        createdBy: req.userAuth._id,
      },
      { new: true }
    );

    // Render the template and pass the academicTerm data to it
    // Change the template name to "updateAcademicTerms" instead of "academic-term/updateAcademicTerms"
    //push academic into admin

    res.render("academic-term/updateAcademicTerms", {
      title: "Update Academic Term",
      academicTerm: academicTerm,
    });
    if (academicTerm && name && description && duration) {
      res.redirect("/academic-term/index");
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

//@desc   Delete  Academic term
//@route  PUT /api/v1/academic-terms/:id
//@acess  Private
exports.deleteAcademicTerm = AsyncHandler(async (req, res) => {
  await AcademicTerm.findByIdAndDelete(req.params.id);
  res.redirect("/academic-term/index"); // Redirect to the list or any other desired page
});
