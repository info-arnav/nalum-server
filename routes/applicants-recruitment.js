const registerations = require("../schemas/registerations");
const recruitments = require("../schemas/recruitment");
const express = require("express");
const nodemailer = require("nodemailer");
const authenticate = require("../utilities/authenticate");

const router = express.Router();

router.post("/", async (req, res) => {
  let body = req.body;
  let auth = authenticate(body.auth_email, body.token);
  let userData = await registerations.find({ email: body.auth_email });
  if (auth && userData[0].verified == "true" && userData[0].type == "student") {
    let email = body.auth_email;
    delete body.auth_email;
    delete body.token;
    let data = await recruitments.find(body);
    let applicants;
    if (!data[0].applicants) {
      await recruitments.findOneAndUpdate(body, { applicants: [email] });
      applicants = 1;
    } else if (data[0].applicants.indexOf(email) != -1) {
      await recruitments.findOneAndUpdate(body, {
        $pull: { applicants: email },
      });
      applicants = data[0].applicants.length - 1;
    } else {
      await recruitments.findOneAndUpdate(body, {
        $push: { applicants: email },
      });
      applicants = data[0].applicants.length + 1;
    }
    let numbers = [
      1, 10, 50, 100, 150, 200, 250, 300, 500, 1000, 1500, 2000, 5000, 10000,
      20000, 30000, 50000,
    ];
    if (numbers.includes(applicants)) {
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
      if (applicants == 1) {
        await transporter.sendMail({
          from: `"Nalum" <admin@alumninet.in>`,
          to: data[0].email,
          subject: "You just got your first applicant.",
          text: `You just got your first applicant.`,
          html: `
        <p>
        Hi,
        <br>
        <br>
        You just got your first applicant for the oppurtunity you posted on Nalum. Check it out now <a href="${process.env.LINK}">here</a>.
        <br>
        <br>
        Regards
        <br>
        Team Nalum
        </p>
        `,
        });
      } else {
        await transporter.sendMail({
          from: `"Nalum" <admin@alumninet.in>`,
          to: data[0].email,
          subject: `You just got your first ${applicants} applicants.`,
          text: `You just got your first ${applicants} applicants.`,
          html: `
        <p>
        Hi,
        <br>
        <br>
        You just got your first ${applicants} applicants for the oppurtunity you posted on Nalum. Check it out now <a href="${process.env.LINK}">here</a>.
        <br>
        <br>
        Regards
        <br>
        Team Nalum
        </p>
        `,
        });
      }
    }
    data = await recruitments.find(body);
    res.json({ error: false, data: data[0].applicants });
  } else {
    res.json({ error: true, message: "Some Error Occured" });
  }
});

module.exports = router;
