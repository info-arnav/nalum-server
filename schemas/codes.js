const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema({
  code: String,
  owner: String,
});

const Codes = mongoose.model("Code", codeSchema);

module.exports = Codes;
