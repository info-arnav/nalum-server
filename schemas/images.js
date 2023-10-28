const { default: mongoose } = require("mongoose");

const imagesSchema = new mongoose.Schema({
  title: "image",
  properties: {
    _id: {
      bsonType: "objectId",
    },
    image: {
      bsonType: "string",
    },
    id: {
      bsonType: "string",
    },
  },
});

const Images = mongoose.model("image", imagesSchema);

module.exports = Images;
