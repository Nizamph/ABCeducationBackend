const express = require("express");
const router = express.Router();
const { register, auth } = require("../controller/authController");
router.post("/register", register);

router.post("/login", auth);

module.exports = router;
