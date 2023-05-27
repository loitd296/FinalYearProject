const AsyncHandler = require("express-async-handler");
const AcademicTerm = require("../../model/Academic/AcademicTerm");
const Admin = require("../../model/Staff/Admin");

//@desc Create Academic Term Year
//@route POST /api/v1/academic-terms
//@acess  Private
exports.createAcademicTerm = AsyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;
  //check if exists
  const academicTerm = await AcademicTerm.findOne({ name });
  if (academicTerm) {
    throw new Error("Academic term already exists");
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
  const academicTerms = await AcademicTerm.find();

  res.render("academic-term/index", {
    title: "Academic Years",
    academicTerms: academicTerms,
  });
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
      throw new Error("Academic term already exists");
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
