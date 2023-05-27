const express = require("express");
const {
  createAcademicTerm,
  deleteAcademicTerm,
  getAcademicTerm,
  getAcademicTerms,
  updateAcademicTerms,
  searchAcademicTerms,
} = require("../../controller/academics/academicTermCtrl");

const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

const academicTermRouter = express.Router();

academicTermRouter.post(
  "/createAcademicTerm",
  isLogin,
  isAdmin,
  createAcademicTerm
);
academicTermRouter.get("/createAcademicTerm", (req, res) => {
  res.render("academic-term/createAcademicTerm", { title: "Create" });
});
academicTermRouter.get("/index", isLogin, isAdmin, getAcademicTerms);

// academicTermRouter.get("/index", (req, res) => {
//   res.render("academic-term/index", {
//     title: "Get all",
//     academicTerms: academicTerms,
//   });
// });

academicTermRouter.get("/search", isLogin, isAdmin, searchAcademicTerms);

academicTermRouter.get("/:id", isLogin, isAdmin, getAcademicTerm);
// Update the route paths to use "/academic-term" instead of "/academic-terms"
academicTermRouter.get("/:id/update", isLogin, isAdmin, updateAcademicTerms);
academicTermRouter.post("/:id/update", isLogin, isAdmin, updateAcademicTerms);

academicTermRouter.get("/:id/delete", isLogin, isAdmin, async (req, res) => {
  res.render("academic-term/deleteAcademicTerm", {
    title: "Delete Academic Term",
    academicTermId: req.params.id,
  });
});

academicTermRouter.post("/:id/delete", isLogin, isAdmin, deleteAcademicTerm);

module.exports = academicTermRouter;
