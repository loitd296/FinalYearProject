const Admin = require("../model/Staff/Admin");
const verifyToken = require("../utils/verifyToken");

const isLogin = async (req, res, next) => {
  // Get token from header
  const headerObj = req.headers;
  const authorizationHeader = headerObj.authorization;

  if (!authorizationHeader) {
    const err = new Error("Authorization header is missing");
    return next(err);
  }

  const token = authorizationHeader.split(" ")[1];

  // Verify token
  const verifiedToken = verifyToken(token);

  if (verifiedToken) {
    try {
      // Find the admin
      const user = await Admin.findById(verifiedToken.id).select(
        "name email role"
      );

      // Save the user into req.userAuth
      req.userAuth = user;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    const err = new Error("Token expired/invalid");
    next(err);
  }
};

module.exports = isLogin;
