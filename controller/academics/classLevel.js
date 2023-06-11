const AsyncHandler = require("express-async-handler");
const ClassLevel = require("../../model/Academic/ClassLevel");
const Admin = require("../../model/Staff/Admin");

//@desc  Create Class Level
//@route POST /api/v1/class-levels
//@acess  Private
exports.createClassLevel = AsyncHandler(async (req, res) => {
  const { name, description } = req.body;
  //check if exists
  const classFound = await ClassLevel.findOne({ name });
  if (classFound) {
    throw new Error("Class  already exists");
  }
  //create
  const classCreated = await ClassLevel.create({
    name,
    description,
    createdBy: req.userAuth._id,
  });
  //push class into admin
  const admin = await Admin.findById(req.userAuth._id);
  admin.classLevels.push(classCreated._id);
  //save
  await admin.save();
  res.redirect("/class-level/index");
});

//@desc  get all class levels
//@route GET /api/v1/class-levels
//@acess  Private
exports.getClassLevels = AsyncHandler(async (req, res) => {
  const classes = await ClassLevel.find();
  res.render("class-level/index", {
    title: "Class level",
    classes: classes,
  });
});

//@desc  get single Class level
//@route GET /api/v1/class-levels/:id
//@acess  Private
exports.getClassLevel = AsyncHandler(async (req, res) => {
  const classLevel = await ClassLevel.findById(req.params.id);
  res.render("class-level/classLevel", {
    title: "Class Level",
    classLevel: classLevel,
  });
});

//@desc  get single Academic Year
//@route GET /api/v1/academic-years/:id
//@acess  Private
exports.searchClassLevels = AsyncHandler(async (req, res, next) => {
  try {
    const searchQuery = req.query.search;
    const classes = await ClassLevel.find({
      name: { $regex: searchQuery, $options: "i" },
    });
    res.render("class-level/index", {
      title: "Class Levels",
      classes: classes,
    });
  } catch (error) {
    console.error("Error in searchClassLevels:", error);
    next(error);
  }
});

//@desc   Update  Class Level
//@route  PUT /api/v1/class-levels/:id
//@acess  Private

exports.updateclassLevel = AsyncHandler(async (req, res) => {
  const { name, description } = req.body;
  //check name exists
  const classFound = await ClassLevel.findOne({ name });
  if (classFound) {
    throw new Error("Class already exists");
  }
  const classLevel = await ClassLevel.findByIdAndUpdate(
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
  res.render("class-level/updateClassLevel", {
    title: "Update Class Level",
    classLevel: classLevel,
  });
  if (classLevel && name && description) {
    res.redirect("/class-level/index");
  }
});

//@desc   Delete  class level
//@route  PUT /api/v1/aclass-levels/:id
//@acess  Private
exports.deleteClassLevel = AsyncHandler(async function (req, res) {
  await ClassLevel.findByIdAndDelete(req.params.id);
  res.redirect("/class-level/index"); // Redirect to the class levels list or any other desired page
});
