const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const adminSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  password: { type: String, required: true },
});

adminSchema.methods.matchPassword = async function (currentPassword) {
  // console.log('comparing password', currentPassword, this.password);
  return await bcrypt.compare(currentPassword, this.password);
};

adminSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("Admin", adminSchema);
module.exports = User;
