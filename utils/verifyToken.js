const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, "anykey");
    return decoded;
  } catch (err) {
    return {
      msg: "Invalid token",
    };
  }
};

module.exports = verifyToken;
