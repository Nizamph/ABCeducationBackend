const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

userSchema.methods.matchPassword = async function (currentPassword) {
  console.log("comparing password", currentPassword, this.password);
  return await bcrypt.compare(currentPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  console.log("salt", salt);
  console.log("this password", this.password);
  this.password = await bcrypt.hash(this.password, salt);
  console.log("new this password", this.password);
});

const User = mongoose.model("User", userSchema);
module.exports = User;
