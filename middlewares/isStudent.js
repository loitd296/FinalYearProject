const Student = require("../model/Academic/Student");

const isStudent = async (req, res, next) => {
  //find the user
  const userId = req?.userAuth?._id;
  console.log(userId);
  const studentFound = await Student.findById(userId);
  console.log(studentFound);
  //check if student
  if (studentFound?.role === "student") {
    next();
  } else {
    next(new Error("Access Denied, Student only"));
  }
};

module.exports = isStudent;
