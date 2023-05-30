const express = require("express");
const {
  createSubject,
  deleteSubject,
  getProgram,
  getSubjects,
  updatSubject,
  renderCreateSubject,
  searchSubject,
  getSubject,
  updateSubject,
} = require("../../controller/academics/subjects");

const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

const subjectRouter = express.Router();

subjectRouter.post("/createSubject", isLogin, isAdmin, createSubject);
subjectRouter.get("/createSubject", renderCreateSubject);

subjectRouter.get("/index", isLogin, isAdmin, getSubjects);

subjectRouter.get("/search", isLogin, isAdmin, searchSubject);

subjectRouter.get("/:id", isLogin, isAdmin, getSubject);

subjectRouter.get("/:id/update", isLogin, isAdmin, updateSubject);
subjectRouter.post("/:id/update", isLogin, isAdmin, updateSubject);

subjectRouter.get("/:id/delete", isLogin, isAdmin, async (req, res) => {
  res.render("subject/deleteSubject", {
    title: "Delete Subject",
    subjectid: req.params.id,
  });
});

subjectRouter.post("/:id/delete", isLogin, isAdmin, deleteSubject);
module.exports = subjectRouter;
