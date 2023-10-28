const { default: mongoose } = require("mongoose");

const otpSchema = new mongoose.Schema({
  title: "otp",
  properties: {
    _id: {
      bsonType: "objectId",
    },
    email: {
      bsonType: "string",
    },
    otp: {
      bsonType: "string",
    },
  },
});

const Otp = mongoose.model("otp", otpSchema);

module.exports = Otp;
