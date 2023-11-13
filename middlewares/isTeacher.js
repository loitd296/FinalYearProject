const Teacher = require("../model/Staff/Teacher");

const isTeacher = async (req, res, next) => {
  const userId = req?.userAuth?._id;

  const teacherFound = await Teacher.findById(userId);

  if (teacherFound?.role === "teacher") {
    req.teacher = teacherFound; // Set the teacher object on the request
    next();
  } else {
    res.render("admin/error");
  }
};

module.exports = isTeacher;
