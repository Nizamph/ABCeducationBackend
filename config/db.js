const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("uri", process.env.MONGO_URI);
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {});
    console.log(`mongoDM connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error:${err.message}`);
  }
};

module.exports = connectDB;
