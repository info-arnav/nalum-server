const { default: mongoose } = require("mongoose");

const recruitedSchema = new mongoose.Schema({
  title: "recruited",
  properties: {
    _id: {
      bsonType: "objectId",
    },
    stipend: {
      bsonType: "string",
    },
    title: {
      bsonType: "string",
    },
    description: {
      bsonType: "string",
    },
    company: {
      bsonType: "string",
    },
    email: {
      bsonType: "string",
    },
    link: {
      bsonType: "string",
    },
    date: {
      bsonType: "string",
    },
    location: {
      bsonType: "string",
    },
    duration: {
      bsonType: "string",
    },
    applicants: {
      bsonType: "array",
      items: {
        bsonType: "string",
      },
    },
    deadline: {
      bsonType: "string",
    },
  },
});

const Recruited = mongoose.model("recruited", recruitedSchema);

module.exports = Recruited;
