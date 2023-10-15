const Admin = require("../model/Staff/Admin");

const isAdmin = async (req, res, next) => {
  //find the user
  const userId = req?.userAuth?._id;
  const adminFound = await Admin.findById(userId);
  //check if admin
  if (adminFound?.role === "admin") {
    next();
  } else {
    res.status(500).json({ error: "Access Denied, admin only" });
  }
};

module.exports = isAdmin;
