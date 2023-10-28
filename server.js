const express = require("express");
const mongoose = require("mongoose");

const status = require("./routes/status");

require("dotenv").config();

const app = express();

MONGODB_URL = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => {
    console.error(error);
  });

app.use("/status", status);

app.listen(5000);
