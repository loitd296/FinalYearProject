const jwt = require("jsonwebtoken");

const isLogin = (req, res, next) => {
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

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      res.locals.loggedIn = false;
      return next();
    }

    req.userAuth = decoded;
    res.locals.loggedIn = true;
    next();
  });
};

module.exports = isLogin;
