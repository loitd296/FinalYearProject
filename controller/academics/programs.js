const AsyncHandler = require("express-async-handler");
const ClassLevel = require("../../model/Academic/ClassLevel");
const Program = require("../../model/Academic/Program");
const Subject = require("../../model/Academic/Subject");
const Admin = require("../../model/Staff/Admin");

//@desc  Create Program
//@route POST /api/v1/programs
//@acess  Private
exports.createProgram = AsyncHandler(async (req, res) => {
  const { name, description } = req.body;
  //check if exists
  const programFound = await Program.findOne({ name });
  if (programFound) {
    throw new Error("Program  already exists");
  }
  const programCreated = await Program.create({
    name,
    description,
    createdBy: req.userAuth._id,
  });
  const admin = await Admin.findById(req.userAuth._id);
  admin.programs.push(programCreated._id);
  await admin.save();

  res.redirect("/program/index"); // Redirect to the list or any other desired page
});

//@desc  get all Programs
//@route GET /api/v1/programs
//@acess  Private

exports.getPrograms = AsyncHandler(async (req, res) => {
  const programs = await Program.find();
  res.render("program/index", {
    title: "Program",
    Programs: programs,
  });
});

exports.searchProgram = AsyncHandler(async (req, res) => {
  const searchQuery = req.query.search;
  const program = await Program.find({
    name: { $regex: searchQuery, $options: "i" },
  });
  console.log(program);

  res.render("program/index", {
    title: "Program",
    Programs: program,
  });
});
//@desc  get single Program
//@route GET /api/v1/programs/:id
//@acess  Private
exports.getProgram = AsyncHandler(async (req, res) => {
  const program = await Program.findById(req.params.id);
  res.render("program/program", {
    title: "Program",
    Program: program,
  });
});

//@desc   Update  Program
//@route  PUT /api/v1/programs/:id
//@acess  Private

exports.updateProgram = AsyncHandler(async (req, res) => {
  const { name, description } = req.body;
  //check name exists
  const programFound = await ClassLevel.findOne({ name });
  if (programFound) {
    throw new Error("Program already exists");
  }
  const program = await Program.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      createdBy: req.userAuth._id,
    },
    {
      new: true,
    }
  );

  res.render("program/updateProgram", {
    title: "Update Program",
    Program: program,
  });
  if (program && name && description) {
    res.redirect("/program/index");
  }
});

//@desc   Delete  Program
//@route  PUT /api/v1/programs/:id
//@acess  Private
exports.deleteProgram = AsyncHandler(async (req, res) => {
  await Program.findByIdAndDelete(req.params.id);
  res.redirect("/program/index"); // Redirect to the list or any other desired page
});
//@desc   Add subject to Program
//@route  PUT /api/v1/programs/:id/subjects
//@acess  Private
exports.addSubjectToProgram = AsyncHandler(async (req, res) => {
  const { name } = req.body;
  //get the program
  const program = await Program.findById(req.params.id);
  if (!program) {
    throw new Error("Program not found");
  }
  //Find the subject
  const subjectFound = await Subject.findOne({ name });
  if (!subjectFound) {
    throw new Error("Subject not found");
  }
  //Check if subject exists
  const subjectExists = program.subjects?.find(
    (sub) => sub?.toString() === subjectFound?._id.toString()
  );
  if (subjectExists) {
    throw new Error("Subject already exists");
  }
  //push the subj into program
  program.subjects.push(subjectFound?._id);
  //save
  await program.save();
  res.status(201).json({
    status: "success",
    message: "Subject added successfully",
    data: program,
  });
});
