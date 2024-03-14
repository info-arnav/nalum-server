const registerations = require("../schemas/registerations");
const express = require("express");
const authenticate = require("../utilities/authenticate");
const Events = require("../schemas/events");
const Images = require("../schemas/images");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post("/", async (req, res) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.rediffmailpro.com",
    port: 465,
    secure: true,
    auth: {
      user: "admin@alumninet.in",
      pass: process.env.MAIL_PASSWORD,
    },
  });
  let body = req.body;
  let auth = authenticate(body.email, body.token);
  let userData = await registerations.find({ email: body.email });
  if (auth && userData[0].type == "admin") {
    let filters = { verified: "true" };
    if (body.notify.value) {
      filters.type = body.notify.value;
    }
    let allusers = await registerations.find(filters).select("email");
    allusers.map(
      async (e) =>
        await transporter.sendMail({
          from: `"Nalum" <admin@alumninet.in>`,
          to: e.email,
          subject: `${body.subject}`,
          text: `${body.body}`,
        })
    );
    res.json({ error: false, data: "true" });
  } else {
    res.json({ error: true, message: "Some Error Occured" });
  }
});

module.exports = router;
