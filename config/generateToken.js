const jwt = require("jsonwebtoken");
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JSON_PRIVATE_KEY, {
    expiresIn: "20d",
  });
};

module.exports = generateToken;
