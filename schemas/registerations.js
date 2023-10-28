const { default: mongoose } = require("mongoose");

const registerationSchema = new mongoose.Schema({
  title: "registeration",
  properties: {
    _id: {
      bsonType: "objectId",
    },
    sessions: {
      bsonType: "array",
      items: {
        bsonType: "string",
      },
    },
    batch: {
      bsonType: "string",
    },
    bio: {
      bsonType: "string",
    },
    branch: {
      bsonType: "string",
    },
    linkedin: {
      bsonType: "string",
    },
    email: {
      bsonType: "string",
    },
    name: {
      bsonType: "string",
    },
    occupation: {
      bsonType: "string",
    },
    education: {
      bsonType: "string",
    },
    projects: {
      bsonType: "string",
    },
    honors: {
      bsonType: "string",
    },
    password: {
      bsonType: "string",
    },
    type: {
      bsonType: "string",
    },
    verified: {
      bsonType: "string",
    },
    files: {
      bsonType: "string",
    },
    portfolio: {
      bsonType: "string",
    },
    otp: {
      bsonType: "string",
    },
    api: {
      bsonType: "string",
    },
    image: {
      bsonType: "string",
    },
    applications: {
      bsonType: "string",
    },
    user_id: {
      bsonType: "string",
    },
    phone: {
      bsonType: "string",
    },
    course: {
      bsonType: "string",
    },
    department: {
      bsonType: "string",
    },
    work_status: {
      bsonType: "string",
    },
    roll: {
      bsonType: "string",
    },
    error: {
      bsonType: "string",
    },
    instagram: {
      bsonType: "string",
    },
    facebook: {
      bsonType: "string",
    },
  },
});

const Registerations = mongoose.model("registeration", registerationSchema);

module.exports = Registerations;
