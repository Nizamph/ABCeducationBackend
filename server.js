const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");

const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
connectDB();
app.use("/api/auth", authRoutes);
app.use("/api/course", courseRoutes);
app.get("/", (req, res) => res.json({ message: "welcome" }));
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
