const { default: mongoose } = require("mongoose");

const recruitmentSchema = new mongoose.Schema({
  title: "recruitment",
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

const Recruitment = mongoose.model("recruitment", recruitmentSchema);

module.exports = Recruitment;
