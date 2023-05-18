const globalErrHandler = (err, req, res, next) => {
  //status
  //message
  //stack
  const stack = err.stack;
  const message = err.message;
  const status = err.status ? err.status : "failed";
  const statusCode = err.statusCode ? err.statusCode : 500;
  res.status(statusCode).json({
    status,
    message,
    stack,
  });
};

//Not found
const notFoundErr = (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on the server`);
  next(err);
};

// Middleware to check if the user is logged in
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    // User is logged in, proceed to the next middleware
    next();
  } else {
    // User is not logged in, redirect to the login page
    res.redirect("/admin/login");
  }
};

module.exports = { globalErrHandler, notFoundErr, isAuthenticated };
