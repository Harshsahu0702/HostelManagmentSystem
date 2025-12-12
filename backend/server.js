const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json()); // IMPORTANT for reading JSON body

// routes
app.use("/api/auth", authRoutes);

// DB
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/hostel-management";

mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB connected:", mongoURI))
  .catch(err => console.error("MongoDB connection error:", err));


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
