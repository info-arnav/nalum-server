const nodemailer = require("nodemailer");
const otp = require("../schemas/otp");
const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  let body = req.body;
  try {
    let otpData = await otp.find({ email: body.email });
    if (otpData[0].otp == body.otp) {
      res.json({ error: false, message: "OTP validated" });
    } else {
      res.json({ error: true, message: "Invalid OTP" });
    }
  } catch {
    res.json({ error: true, message: "Some Error Occured" });
  }
});

module.exports = router;
