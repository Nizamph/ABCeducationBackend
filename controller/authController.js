const User = require("../models/userModel");
const Admin = require("../models/adminModel");
const generateToken = require("../config/generateToken");
const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log("request body", req.body);
  if (!name || !email || !password || !role) {
    res.status(400).json({ errorMessage: "Complete form and submit" });
    throw new Error("Complete the form and submit");
  }
  if (role === "Admin") {
    const adminExist = await Admin.findOne({ email });
    if (adminExist) {
      res.status(400).json({ errorMessage: "admin is already exist" });
      throw new Error("admin is already exist");
    }
    const adminData = await Admin.create({
      name: name,
      email: email,
      role: role,
      password: password,
    });
    if (adminData) {
      res.status(201).json({
        adminId: adminData._id,
        name: adminData.name,
        email: adminData.email,
        role: adminData.role,
        token: generateToken(adminData._id),
      });
    } else {
      res.status(400).json({ errorMessage: "Admin registration failed" });
      throw new Error("Admin registration failed");
    }
  } else if (role === "User") {
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400).json({ errorMessage: "user is already exist" });
      throw new Error("User is already exist");
    }
    const usersData = await User.create({
      name: name,
      email: email,
      password: password,
      role: role,
    });

    // console.log('usersData', usersData);

    if (usersData) {
      res.status(201).json({
        userId: usersData._id,
        name: usersData.name,
        email: usersData.email,
        role: usersData.role,
        token: generateToken(usersData._id),
      });
    } else {
      res.status(400).json({ errorMessage: "user registration failed" });
      throw new Error("User registration failed");
    }
  }
};

const auth = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      res.status(400);
      throw new Error("Please complete the form to login");
    }
    if (role === "Admin") {
      const adminExist = await Admin.findOne({ email });
      if (adminExist) {
        if (await adminExist.matchPassword(password)) {
          res.json({
            id: adminExist._id,
            name: adminExist.name,
            email: adminExist.email,
            role: adminExist.role,
            token: generateToken(adminExist._id),
          });
        } else {
          res.status(401).json({
            errorMessage: "Incorrect password for admin",
          });
        }
      } else {
        res.status(400).json({
          errorMessage: "Admin not found, please register first",
        });
      }
    } else if (role === "User") {
      const userExist = await User.findOne({ email });
      if (userExist) {
        if (await userExist.matchPassword(password)) {
          res.json({
            id: userExist._id,
            name: userExist.name,
            email: userExist.email,
            role: userExist.role,
            token: generateToken(userExist._id),
          });
        } else {
          res.status(401).json({
            errorMessage: "Incorrect password for user",
          });
        }
      } else {
        res.status(400).json({
          errorMessage: "User not found, please register first",
        });
      }
    }
  } catch (err) {
    res.status(500).json({ errorMessage: "something went wrong (login)" });
  }
};

module.exports = { register, auth };
