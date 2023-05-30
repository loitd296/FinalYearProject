const express = require("express");
const {
  createProgram,
  deleteProgram,
  getProgram,
  getPrograms,
  updateProgram,
  addSubjectToProgram,
  searchProgram,
} = require("../../controller/academics/programs");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

const programRouter = express.Router();

programRouter.post("/createProgram", isLogin, isAdmin, createProgram);
programRouter.get("/createProgram", (req, res) => {
  res.render("program/createProgram", { title: "Create" });
});

programRouter.get("/index", isLogin, isAdmin, getPrograms);

programRouter.get("/search", isLogin, isAdmin, searchProgram);

programRouter.get("/:id", isLogin, isAdmin, getProgram);

programRouter.get("/:id/update", isLogin, isAdmin, updateProgram);
programRouter.post("/:id/update", isLogin, isAdmin, updateProgram);

programRouter.get("/:id/delete", isLogin, isAdmin, async (req, res) => {
  res.render("program/deleteProgram", {
    title: "Delete Program",
    programId: req.params.id,
  });
});
programRouter.post("/:id/delete", isLogin, isAdmin, deleteProgram);

programRouter.put("/:id/subjects", isLogin, isAdmin, addSubjectToProgram);

module.exports = programRouter;
