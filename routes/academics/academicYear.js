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

academicYearRouter.get("/:id/update", isLogin, isAdmin, updateAcademicYear);
academicYearRouter.post("/:id/update", isLogin, isAdmin, updateAcademicYear);

academicYearRouter.get("/:id", isLogin, isAdmin, getAcademicYear);

academicYearRouter.get("/:id/delete", isLogin, isAdmin, async (req, res) => {
  res.render("academic-years/deleteAcademicYear", {
    title: "Delete Academic Year",
    academicYearId: req.params.id,
  });
});

academicYearRouter.post("/:id/delete", isLogin, isAdmin, deleteAcademicYear);

module.exports = academicYearRouter;
