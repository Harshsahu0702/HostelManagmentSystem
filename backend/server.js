const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json()); // IMPORTANT for reading JSON body
const authRoutes = require("./routes/authRoutes");

// routes
app.use("/api/auth", authRoutes);

// DB
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/hostel-management";

mongoose.connect(mongoURI)
  .then(() => {
    // If a MONGO_URI env var is provided we assume Atlas (or remote), otherwise local
    if (process.env.MONGO_URI) {
      console.log("MongoDB connected (Atlas):");
    } else {
      console.log("MongoDB connected (Local):", mongoURI);
    }
  })
  .catch(err => console.error("MongoDB connection error:", err));


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
