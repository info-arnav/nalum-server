const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
});

const Otp = mongoose.model("OTP", otpSchema);

module.exports = Otp;
