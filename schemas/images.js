const mongoose = require("mongoose");

const imagesSchema = new mongoose.Schema({
  image: String,
  id: String,
});

const Images = mongoose.model("Image", imagesSchema);

module.exports = Images;
