const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

MONGODB_URL = "mongodb://localhost:27017";

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.get("/status", (req, res) => {
  res.json({ status: "ok" });
});
