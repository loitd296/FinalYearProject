const express = require("express");
const {
  createClassLevel,
  deleteClassLevel,
  getClassLevel,
  getClassLevels,
  updateclassLevel,
  searchClassLevels,
  deleteClassLevelConfirmation,
} = require("../../controller/academics/classLevel");

const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

const classLevelRouter = express.Router();

classLevelRouter.get("/createClassLevel", (req, res) => {
  res.render("class-level/createClassLevel", { title: "Create" });
});
classLevelRouter.post("/createClassLevel", isLogin, isAdmin, createClassLevel);

classLevelRouter.get("/index", isLogin, isAdmin, getClassLevels);

classLevelRouter.get("/search", isLogin, isAdmin, searchClassLevels);

classLevelRouter.get("/:id/update", isLogin, isAdmin, updateclassLevel);
classLevelRouter.post("/:id/update", isLogin, isAdmin, updateclassLevel);

classLevelRouter.get("/:id", isLogin, isAdmin, getClassLevel);

classLevelRouter.get("/:id/delete", isLogin, isAdmin, async (req, res) => {
  res.render("class-level/deleteClassLevel", {
    title: "Delete Class Level",
    classLevelId: req.params.id,
  });
});

classLevelRouter.post("/:id/delete", isLogin, isAdmin, deleteClassLevel);

module.exports = classLevelRouter;
