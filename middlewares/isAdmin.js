const Admin = require("../model/Staff/Admin");

const isAdmin = async (req, res, next) => {
  console.log("isAdmin middleware is being called");

  //find the user
  const userId = req?.userAuth?._id;
  const adminFound = await Admin.findById(userId);
  //check if admin
  if (adminFound?.role === "admin") {
    next();
  } else {
    res.render("admin/error");
    // next(new Error("Access Denied, admin only"));
  }
};

module.exports = isAdmin;
