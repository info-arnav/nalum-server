const { default: mongoose } = require("mongoose");

const creationsSchema = new mongoose.Schema({
  title: "creations",
  properties: {
    _id: {
      bsonType: "objectId",
    },
    accepted: {
      bsonType: "string",
    },
    creator: {
      bsonType: "string",
    },
  },
});

const Creations = mongoose.model("creations", creationsSchema);

module.exports = Creations;
