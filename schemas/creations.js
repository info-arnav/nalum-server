const mongoose = require("mongoose");

const creationsSchema = new mongoose.Schema({
  accepted: String,
  creator: String,
});

const Creations = mongoose.model("Creation", creationsSchema);

module.exports = Creations;
