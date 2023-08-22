// middlewares/notAllowLoginPage.js
const notAllowLoginPage = (req, res, next) => {
  // Check if the user is authenticated (change this condition based on your authentication logic)
  if (req.userAuth) {
    // User is logged in, redirect to another page (e.g., dashboard)
    return res.redirect("/"); // Change the URL to your actual dashboard route
  }

  // User is not logged in, continue to the next middleware
  next();
};

module.exports = notAllowLoginPage;
