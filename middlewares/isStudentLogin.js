const Student = require("../model/Academic/Student");
const verifyToken = require("../utils/verifyToken");
const jwt = require("jsonwebtoken");

const isStudentLogin = (req, res, next) => {
  let token;

  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers["x-access-token"]) {
    token = req.headers["x-access-token"];
  }

  if (!token) {
    res.locals.loggedIn = false;
    return next();
  }

  jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
    if (err) {
      res.locals.loggedIn = false;
      return next();
    }

    // find the teacher
    const user = await Student.findById(decoded._id).select("name email role");
    if (!user) {
      res.locals.loggedIn = false;
      return next(new Error("Teacher not found"));
    }

    // save the user into req.obj
    req.userAuth = user;
    res.locals.loggedIn = true;
    next();
  });
};

module.exports = isStudentLogin;
