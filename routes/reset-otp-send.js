const nodemailer = require("nodemailer");
const registerations = require("../schemas/registerations");
const otp = require("../schemas/otp");
const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  let body = req.body;
  const users = await registerations.find({ email: body.email });
  if (users.length != 0) {
    let transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      secure: false,
      port: 587,
      tls: {
        ciphers: "SSLv3",
      },
      auth: {
        user: "admin@alumninet.in",
        pass: process.env.MAIL_PASSWORD,
      },
    });
    let OTP = (Math.floor(Math.random() * 10000) + 10000)
      .toString()
      .substring(1);
    try {
      await transporter
        .sendMail({
          from: `"Nalum" <admin@alumninet.in>`,
          to: body.email,
          subject: "OTP to Reset Password at Nalum",
          text: `Your OTP to Reset password at Nalum is ${OTP}`,
          html: `
        <p>
        Hi,
        <br>
        <br>
        We recieved a request to reset your password at Nalum for this email address. Please use the OTP <b>${OTP}</b> to register. If it wasnt you please ignore this mail.
        <br>
        <br>
        OTP's are private and you should not share it with people you do not know. Nalum or NSUT authorities would not ask you for your OTP's, you should consider any such call as a fraud.
        <br>
        <br>
        Regards
        <br>
        Team Nalum
        </p>
        `,
        })
        .then(async (e) => {
          let otpData = await otp.find({ email: body.email });
          if (otpData.length == 0) {
            otp.create({ email: body.email, otp: OTP });
            res.json({
              error: false,
            });
          } else {
            await otp.findOneAndUpdate({ email: body.email }, { otp: OTP });
            res.json({
              error: false,
            });
          }
        });
    } catch (e) {
      res.json({ error: true, message: "Some Error Occured" });
    }
  } else {
    res.json({ error: true, message: "You are not yet Registered" });
  }
});

module.exports = router;
