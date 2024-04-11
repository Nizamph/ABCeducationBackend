const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const userAuthMiddleware = async (req, res, next) => {
  let token = req.headers.authorization;
  console.log("token from authuserMiddleware", token);
  if (token && token.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decodedToken = jwt.verify(token, process.env.JSON_PRIVATE_KEY);

      req.user = await User.findById(decodedToken.id).select("-password");
      next();
    } catch (err) {
      res.status(401);
      res.json({ message: "not authorised" });
    }
  }
};

module.exports = userAuthMiddleware;
