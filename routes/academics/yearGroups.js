const express = require("express");
const {
  postCreateYearGroup,
  deleteYearGroup,
  getYearGroup,
  getYearGroups,
  updateYearGroup,
  searchYearGroups,
  getCreateYearGroup,
} = require("../../controller/academics/yearGroups");

const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

const yearGroupRouter = express.Router();

yearGroupRouter.get("/createYearGroup", isLogin, isAdmin, getCreateYearGroup);
yearGroupRouter.post("/createYearGroup", isLogin, isAdmin, postCreateYearGroup);

yearGroupRouter.get("/index", isLogin, isAdmin, getYearGroups);

yearGroupRouter.get("/search", isLogin, isAdmin, searchYearGroups);

yearGroupRouter.get("/:id", isLogin, isAdmin, getYearGroup);

yearGroupRouter.get("/:id/update", isLogin, isAdmin, updateYearGroup);
yearGroupRouter.post("/:id/update", isLogin, isAdmin, updateYearGroup);

yearGroupRouter.get("/:id/delete", isLogin, isAdmin, async (req, res) => {
  res.render("year-group/deleteYearGroup", {
    title: "Delete Subject",
    yearGroupId: req.params.id,
  });
});

yearGroupRouter.post("/:id/delete", isLogin, isAdmin, deleteYearGroup);

module.exports = yearGroupRouter;
