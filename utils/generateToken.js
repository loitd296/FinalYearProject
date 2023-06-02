const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  return jwt.sign(payload, "anykey", { expiresIn: "5d" });
};

module.exports = generateToken;
