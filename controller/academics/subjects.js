const asyncHandler = require("express-async-handler");
const Program = require("../../model/Academic/Program");
const AcademicTerm = require("../../model/Academic/AcademicTerm");
const Subject = require("../../model/Academic/Subject");
const Admin = require("../../model/Staff/Admin");
const { calculatePageRange } = require("../../utils/paginationUtils");

exports.renderCreateSubject = async (req, res) => {
  try {
    const programs = await Program.find(); // Fetch all programs from the database
    const academicTerms = await AcademicTerm.find(); // Fetch all academic terms from the database

    res.render("subject/createSubject", { programs, academicTerms });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};
//@desc  Create subject
//@route POST /api/v1/subjects/:programID
//@acess  Private
exports.createSubject = asyncHandler(async (req, res) => {
  const { name, description, academicTerm, program } = req.body;
  // Find the program
  const programFound = await Program.findById(program);
  if (!programFound) {
    return res.status(404).json({ error: "Program not found" });
  }
  // Check if subject already exists
  const subjectFound = await Subject.findOne({ name });
  if (subjectFound) {
    return res.status(404).json({ error: "Subject already exists" });
  }
  // Create the subject
  const subjectCreated = await Subject.create({
    name,
    description,
    academicTerm,
    program: programFound._id,
    createdBy: req.userAuth._id,
  });
  // Push the subject ID to the program's subjects array
  programFound.subjects.push(subjectCreated._id);
  // Save the program and subject
  await Promise.all([programFound.save(), subjectCreated.save()]);
  res.redirect("/subject/index");
});

exports.searchSubject = asyncHandler(async (req, res) => {
  const searchQuery = req.query.search;
  const subjects = await Subject.find({
    name: { $regex: searchQuery, $options: "i" },
  });

  res.render("subject/index", {
    title: "Subject",
    subjects: subjects,
  });
});

//@desc  get all Subjects
//@route GET /api/v1/subjects
//@acess  Private

exports.getSubjects = asyncHandler(async (req, res) => {
  const { search, page } = req.query;
  const limit = 10; // Number of categories to show per page
  const currentPage = parseInt(page) || 1;

  // Build the query based on the search term
  const query = {};
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  // Count the total number of categories matching the search filter
  const totalSubjects = await Subject.countDocuments(query);

  // Calculate the total number of pages based on the limit
  const totalPages = Math.ceil(totalSubjects / limit);

  // Calculate the range of page numbers to display
  const range = 5;
  const { startPage, endPage } = calculatePageRange(
    currentPage,
    totalPages,
    range
  );

  // Get the categories for the current page
  const subjects = await Subject.find(query)
    .populate("program", "name") // Populate the 'program' field with the 'name' property
    .populate("academicTerm", "name") // Populate the 'academicTerm' field with the 'name' property
    .skip((currentPage - 1) * limit)
    .limit(limit);

  res.render("subject/index", {
    title: "Subject",
    subjects: subjects,
    search,
    currentPage,
    totalPages,
    currentPageEntries: subjects.length,
    totalEntries: totalSubjects,
    hasPreviousPage: currentPage > 1,
    previousPage: currentPage - 1,
    hasNextPage: currentPage < totalPages,
    nextPage: currentPage + 1,
    pages: Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    ),
  });
});

//@desc  get single subject
//@route GET /api/v1/subjects/:id
//@acess  Private
exports.getSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id)
    .populate("program", "name") // Populate the 'program' field with the 'name' property
    .populate("academicTerm", "name"); // Populate the 'academicTerm' field with the 'name' property
  res.render("subject/subject", {
    title: "Subject",
    subject: subject,
  });
});

//@desc   Update  Subject
//@route  PUT /api/v1/subjects/:id
//@acess  Private

exports.updateSubject = asyncHandler(async (req, res) => {
  const { name, description, academicTerm } = req.body;
  // Check if subject with the same name already exists
  const existingSubject = await Subject.findOne({ name });
  if (existingSubject && existingSubject._id != req.params.id) {
    throw new Error("Subject already exists");
  }
  // Get all academic terms and programs for the select box options
  const academicTerms = await AcademicTerm.find();
  const programs = await Program.find();
  // Find the subject to update
  const subject = await Subject.findById(req.params.id);
  if (!subject) {
    return res.status(404).json({ error: "Subject not found" });
  }
  const subjectUpdate = await Subject.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      academicTerm,
      createdBy: req.userAuth._id,
    },
    {
      new: true,
    }
  );

  // Render an HBS template for subject update with options and old values
  res.render("subject/updateSubject", {
    title: "Update Subject",
    subject: subject,
    academicTerms: academicTerms,
    programs: programs,
    oldAcademicTerm: subject.academicTerm,
    oldProgram: subject.program,
  });
  if (subject && name && description && academicTerm) {
    res.redirect("/subject/index");
  }
});

//@desc   Delete  Subject
//@route  PUT /api/v1/subjects/:id
//@acess  Private
exports.deleteSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  if (!subject) {
    return res.status(404).json({ error: "Subject not found" });
  }

  await Subject.deleteOne({ _id: req.params.id });

  res.redirect("/subject/index"); // Redirect to the list or any other desired page
});
