const AysncHandler = require("express-async-handler");
const Teacher = require("../../model/Staff/Teacher");
const { hashPassword, isPassMatched } = require("../../utils/helpers");
//@desc  Admin Register Teacher
//@route POST /api/teachers/admin/register
//@acess  Private

exports.adminRegisterTeacher = AysncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //check if teacher already exists
  const teacher = await Teacher.findOne({ email });
  if (teacher) {
    throw new Error("Teacher already employed");
  }
  //Hash password
  const hashedPassword = await hashPassword(password);
  // create
  const teacherCreated = await Teacher.create({
    name,
    email,
    password: hashedPassword,
  });
  //send teacher data
  res.status(201).json({
    status: "success",
    message: "Teacher registered successfully",
    data: teacherCreated,
  });
});
