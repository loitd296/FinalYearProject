const Teacher = require("../model/Staff/Teacher");

const isTeacher = async (req, res, next) => {
  const userId = req?.userAuth?._id;
  console.log("userId:", userId);

  const teacherFound = await Teacher.findById(userId);
  console.log("teacherFound:", teacherFound);

  if (teacherFound?.role === "teacher") {
    next();
  } else {
    next(new Error("Access Denied, Teachers only"));
  }
};

module.exports = isTeacher;
