const { default: mongoose } = require("mongoose");

const verifiedSchema = new mongoose.Schema({
  title: "verified",
  properties: {
    email: {
      bsonType: "string",
    },
    verifier: {
      bsonType: "string",
    },
  },
});

const Verified = mongoose.model("verified", verifiedSchema);

module.exports = Verified;
