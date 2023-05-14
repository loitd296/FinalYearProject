const express = require("express");
const router = express.Router();

// Define user routes
router.get("/", (req, res) => {
  res.render("user/index", { title: "User Home" });
});

router.get("/profile", (req, res) => {
  res.render("user/profile", { title: "User Profile" });
});

// Export the router
module.exports = router;
