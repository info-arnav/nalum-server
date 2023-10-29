const registerations = require("../schemas/registerations");
const recruitments = require("../schemas/recruitment");
const recruitedSchema = require("../schemas/recruited");
const creation = require("../schemas/creations");
const express = require("express");
const nodemailer = require("nodemailer");
const authenticate = require("../utilities/authenticate");

const router = express.Router();

router.post("/", async (req, res) => {
  let body = req.body;
  let auth = authenticate(body.auth_email, body.token);
  let userData = await registerations.find({ email: body.auth_email });
  let emails = body.emails;
  let recruited = body.recruited;
  if (auth && userData[0].verified == "true" && userData[0].type == "alumni") {
    await recruitedSchema.create({
      email: body.auth_email,
      title: body.position,
      company: body.company,
      description: body.description,
      duration: body.duration,
      stipend: body.stipend,
      deadline: body.deadline,
      link: body.link,
      applicants: body.recruited,
      location: body.location,
    });
    await recruitments.findOneAndDelete({ _id: body.id });
    let transporter = nodemailer.createTransport({
      host: "smtp.rediffmailpro.com",
      port: 465,
      secure: true,
      auth: {
        user: "admin@alumninet.in",
        pass: process.env.MAIL_PASSWORD,
      },
    });
    let i;
    for (i = 0; i < emails.length; i++) {
      try {
        transporter.sendMail({
          from: `"Nalum" <admin@alumninet.in>`,
          to: emails[i],
          subject: "Update on Nalum Application",
          text: `We are sorry to inform you that you were rejected from ${body.company} for the post of ${body.position}`,
          html: `
          <p>
          Dear applicant,
          <br>
          <br>
          Nalum is sorry to inform you that your application for <b>${body.position}</b> at <b>${body.company}</b> was <b>rejected</b> by the company.
          <br>
          We hope you understand that the contesting pool was highly eligible for the post. This rejection does not in any way doubt your capabilities.
          <br>
          <br>
          You can contact the recruiter at <b>${body.auth_email}</b> in case of any confusions.
          <br>
          <br>
          Regards
          <br>
          Team Nalum
          </p>
          `,
        });
      } catch {
        continue;
      }
    }
    for (i = 0; i < recruited.length; i++) {
      try {
        transporter.sendMail({
          from: `"Nalum" <admin@alumninet.in>`,
          to: recruited[i],
          subject: "Update on Nalum Application",
          text: `We are pleased to inform you that you were accepted for the post of ${body.position} by the company ${body.company}`,
          html: `
          <p>
          Dear applicant,
          <br>
          <br>
          Nalum is pleased to inform you that your application for <b>${body.position}</b> at <b>${body.company}</b> was <b>accepted</b> by the company. You shall soon be contacted by the company official for more details.
          <br>
          <br>
          You can contact the recruiter at <b>${body.auth_email}</b> in case of any confusions.
          <br>
          <br>
          Regards
          <br>
          Team Nalum
          </p>
          `,
        });
      } catch {
        continue;
      }
    }
    await creation.create({
      creator: body.auth_email,
      accepted: JSON.stringify(recruited),
    });
    let endData = await recruitedSchema.find({
      email: body.auth_email,
      title: body.position,
      company: body.company,
      description: body.description,
      duration: body.duration,
      stipend: body.stipend,
      deadline: body.deadline,
      link: body.link,
      applicants: body.recruited,
      location: body.location,
    });
    res.json({ error: false, id: endData[0]._id });
  } else {
    res.json({ error: true, message: "Some Error Occured" });
  }
});

module.exports = router;
