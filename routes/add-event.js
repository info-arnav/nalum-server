const registerations = require("../schemas/registerations");
const express = require("express");
const authenticate = require("../utilities/authenticate");
const Events = require("../schemas/events");
const Images = require("../schemas/images");
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
  let auth = authenticate(body.email, body.token);
  let userData = await registerations.find({ email: body.email });
  if (auth && userData[0].type == "admin") {
    await Events.create({
      title: body.title,
      link: body.link,
      linkText: body.linkText,
      details: body.description,
    });
    let id = await Events.findOne({}).sort({ _id: -1 });
    await Images.create({ id: id._id, image: body.image });
    if (body.notify == true) {
      let allusers = await registerations
        .find({ verified: "true" })
        .select("email");
      allusers.map(
        async (e) =>
          await transporter.sendMail({
            from: `"Nalum" <admin@alumninet.in>`,
            to: e.email,
            subject: "New Upcoming Event",
            text: `Hi, NSUT is having a new event titled, ${
              body.title
            }. Check out the portal now for further details.
            ${
              body.link &&
              `You can even find the following useful -> ${
                body.linkText ? body.linkText : body.link
              }`
            }`,
            html: `<p>
            Hi, 
            <br>
            NSUT is having a new event titled, ${
              body.title
            }. Check out the portal now for further details.
            ${
              body.link &&
              `<br>You can even find the following useful -> <a href="${
                body.link
              }">${body.linkText ? body.linkText : body.link}</a>`
            }
            <br>
            Regards
            <br>
            Team Nalum
            </p>`,
          })
      );
    }
    res.json({ error: false, data: "true" });
  } else {
    res.json({ error: true, message: "Some Error Occured" });
  }
});

module.exports = router;
