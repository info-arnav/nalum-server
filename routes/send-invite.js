const registerations = require("../schemas/registerations");
const verified = require("../schemas/verified");
const express = require("express");
const authenticate = require("../utilities/authenticate");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post("/", async (req, res) => {
  let transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 465,
    secure: true,
    auth: {
      user: "admin@alumninet.in",
      pass: process.env.MAIL_PASSWORD,
    },
  });
  let body = req.body;
  try {
    let auth = authenticate(body.auth_email, body.token);
    let userData = await registerations.find({ email: body.auth_email });
    if (auth && userData[0].verified == "true") {
      let invitedUser = await registerations.find({ email: body.email });
      if (invitedUser.length == 0) {
        await verified.create({ email: body.email, verifier: body.auth_email });
        await transporter
          .sendMail({
            from: `"Nalum" <admin@alumninet.in>`,
            to: body.email,
            subject: "Invitation For Nalum",
            text: `Invitation For Nalum`,
            html: `
        <p>
        Hi,
        <br>
        <br>
        You were invited to Nalum by one of the alumni of NSUT, Delhi.
        <br>
        <br>
        You can register now at Nalum <a href="${process.env.LINK}register">here</a>.
        <br>
        <br>
        Unlock a world of opportunities and connections at Nalum, the exclusive cross-platform web application designed to empower both NSUT alumni and students. Seamlessly connecting generations, Nalum redefines networking, knowledge sharing, and career advancement within the NSUT community.
        </br>
        <br>
        Regards
        <br>
        Team Nalum
        </p>
        `,
          })
          .then((e) => res.json({ error: false, message: "Invitation Sent" }));
      } else {
        res.json({ error: true, message: "Already Verified" });
      }
    } else {
      res.json({ error: true, message: "Some Error Occured" });
    }
  } catch {
    res.json({ error: true, message: "Some Error Occured" });
  }
});

module.exports = router;
