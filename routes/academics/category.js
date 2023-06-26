const express = require("express");
const {
  createCategory,
  getCategories,
  getCategory,
  searchCategory,
  updateCategory,
  deleteCategory,
} = require("../../controller/academics/categoryCtrl");

const isTeacher = require("../../middlewares/isTeacher");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");

const categoryRouter = express.Router();

categoryRouter.post(
  "/createCategory",
  isTeacherLogin,
  isTeacher,
  createCategory
);
categoryRouter.get("/createCategory", (req, res) => {
  res.render("category/createCategory", { title: "Create" });
});
categoryRouter.get("/index", isTeacherLogin, isTeacher, getCategories);

// academicTermRouter.get("/index", (req, res) => {
//   res.render("academic-term/index", {
//     title: "Get all",
//     academicTerms: academicTerms,
//   });
// });

categoryRouter.get("/search", isTeacherLogin, isTeacher, searchCategory);

categoryRouter.get("/:id", isTeacherLogin, isTeacher, getCategory);
// Update the route paths to use "/academic-term" instead of "/academic-terms"
categoryRouter.get("/:id/update", isTeacherLogin, isTeacher, updateCategory);
categoryRouter.post("/:id/update", isTeacherLogin, isTeacher, updateCategory);

categoryRouter.get(
  "/:id/delete",
  isTeacherLogin,
  isTeacher,
  async (req, res) => {
    res.render("category/deleteCategory", {
      title: "Delete Academic Term",
      categoryId: req.params.id,
    });
  }
);

categoryRouter.post("/:id/delete", isTeacherLogin, isTeacher, deleteCategory);

module.exports = categoryRouter;
