const AsyncHandler = require("express-async-handler");
const Category = require("../../model/Academic/Categories");
const Teacher = require("../../model/Staff/Teacher");

//@desc Create Academic Term Year
//@route POST /api/v1/academic-terms
//@acess  Private
exports.createCategory = AsyncHandler(async (req, res) => {
  const { name } = req.body;
  //check if exists
  const category = await Category.findOne({ name });
  if (category) {
    throw new Error("Category already exists");
  }
  //create
  const categoryCreated = await Category.create({
    name,
    createdBy: req.userAuth._id,
  });
  //push academic into admin
  const teacher = await Teacher.findById(req.userAuth._id);
  teacher.category.push(categoryCreated._id);
  await teacher.save();
  // Redirect to the dashboard page
  res.redirect("/category/index");
});

//@desc  get all Academic terms
//@route GET /api/v1/academic-terms
//@acess  Private
exports.getCategories = AsyncHandler(async (req, res) => {
  try {
    const { search, page } = req.query;
    const limit = 5; // Number of categories to show per page
    const currentPage = parseInt(page) || 1;

    // Build the query based on the search term
    const query = {};
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // Count the total number of categories matching the search filter
    const totalCategories = await Category.countDocuments(query);

    // Calculate the total number of pages based on the limit
    const totalPages = Math.ceil(totalCategories / limit);

    // Get the categories for the current page
    const categories = await Category.find(query)
      .skip((currentPage - 1) * limit)
      .limit(limit);

    res.render("category/index", {
      title: "Category List",
      categories,
      search,
      currentPage,
      totalPages,
      currentPageEntries: categories.length,
      totalEntries: totalCategories,
      hasPreviousPage: currentPage > 1,
      previousPage: currentPage - 1,
      hasNextPage: currentPage < totalPages,
      nextPage: currentPage + 1,
      pages: Array.from({ length: totalPages }, (_, i) => i + 1),
    });
  } catch (err) {
    console.error("Error retrieving categories:", err);
    res.render("category/index", {
      title: "Category List",
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
exports.getCategory = AsyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  res.render("category/category", {
    title: "Academic Term",
    category: category,
  });
});

//@desc  get single Academic Year
//@route GET /api/v1/academic-years/:id
//@acess  Private
exports.searchCategory = AsyncHandler(async (req, res) => {
  const searchQuery = req.query.search;
  const categories = await Category.find({
    name: { $regex: searchQuery, $options: "i" },
  });

  res.render("category/index", {
    title: "Academic Terms",
    categories: categories,
  });
});

//@desc   Update  Academic term
//@route  PUT /api/v1/academic-terms/:id
//@acess  Private
exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const categoryId = req.params.id;

    // Check if the academic term with the same name already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      throw new Error("Category already exists");
    }

    // Find and update the academic term by ID
    const category = await Category.findByIdAndUpdate(
      categoryId,
      {
        name,
        createdBy: req.userAuth._id,
      },
      { new: true }
    );

    // Render the template and pass the academicTerm data to it
    // Change the template name to "updateAcademicTerms" instead of "academic-term/updateAcademicTerms"
    //push academic into admin

    res.render("category/updateCategory", {
      title: "Update Academic Term",
      category: category,
    });
    if (name) {
      res.redirect("/category/index");
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
exports.deleteCategory = AsyncHandler(async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.redirect("/category/index"); // Redirect to the list or any other desired page
});
