const mongoose = require("mongoose");

const verifiedSchema = new mongoose.Schema({
  email: String,
  verifier: String,
});

const Verified = mongoose.model("Verified", verifiedSchema);

module.exports = Verified;
