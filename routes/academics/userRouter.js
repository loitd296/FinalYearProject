const express = require("express");
const Teacher = require("../../model/Staff/Teacher");
const router = express.Router();
const isLogin = require("../../middlewares/isLogin");
const isTeacher = require("../../middlewares/isTeacher");
const isStudent = require("../../middlewares/isStudent");
const Student = require("../../model/Academic/Student");

// Define user routes
router.get("/", async (req, res) => {
  res.render("user/index", {
    title: "User Home",
  });
});

// Export the router
module.exports = router;
