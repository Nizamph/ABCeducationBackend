const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
const adminAuthMiddleware = async (req, res, next) => {
  console.log("middleware working");
  let token = req.headers.authorization;
  console.log("token from middleware", token);
  if (token && token.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decodedToken = jwt.verify(token, process.env.JSON_PRIVATE_KEY);

      req.user = await Admin.findById(decodedToken.id).select("-password");
      next();
    } catch (err) {
      res.status(401);
      res.json({ message: "not authorised" });
    }
  }
};

module.exports = adminAuthMiddleware;
