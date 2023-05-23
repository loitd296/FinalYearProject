const express = require("express");
const {
  createAcademicYear,
  getAcademicYears,
  getAcademicYear,
  updateAcademicYear,
  deleteAcademicYear,
  searchAcademicYears,
} = require("../../controller/academics/academicYearCtrl");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

const academicYearRouter = express.Router();

academicYearRouter.post(
  "/createAcademicYear",
  isLogin,
  isAdmin,
  createAcademicYear
);
academicYearRouter.get("/createAcademicYear", (req, res) => {
  res.render("academic-years/createAcademicYear", { title: "Create" });
});
academicYearRouter.get("/index", isLogin, isAdmin, getAcademicYears);
academicYearRouter.get("/search", isLogin, isAdmin, searchAcademicYears);

academicYearRouter.post("/:id/update", isLogin, isAdmin, updateAcademicYear);
academicYearRouter.get("/:id/update", (req, res) => {
  res.render("academic-years/updateAcademicYear", {
    title: "Update Academic Year",
  });
});

academicYearRouter.get("/:id", isLogin, isAdmin, getAcademicYear);

academicYearRouter.delete("/:id/delete", isLogin, isAdmin, deleteAcademicYear);
academicYearRouter.get("/:id/delete", (req, res) => {
  res.render("academic-years/deleteAcademicYear", {
    title: "Update Academic Year",
  });
});

module.exports = academicYearRouter;
