const registerations = require("../schemas/registerations");
const express = require("express");
const authenticate = require("../utilities/authenticate");
const algoliasearch = require("algoliasearch");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post("/", async (req, res) => {
  let body = req.body;
  const client = algoliasearch(
    process.env.ALGOLIA_MAIN,
    process.env.ALGOLIA_PRIVATE
  );
  const index = client.initIndex("dev_alum");
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
  let auth = authenticate(body.email, body.token);
  let userData = await registerations.find({ email: body.email });
  if (auth && userData[0].verified == "true" && userData[0].type == "admin") {
    await registerations.findOneAndUpdate(
      { email: body.second_email },
      {
        verified: body.verified,
        error: body.error,
      }
    );
    let newUserData = await registerations.find({ email: body.second_email });
    if (body.verified == "true") {
      await index
        .saveObject({
          type: "alumni",
          email: body.second_email,
          objectID: newUserData[0]._id,
          image: `${process.env.LINK}api/image/${newUserData[0]._id}`,
          batch: newUserData[0].batch,
          name: newUserData[0].name,
        })
        .then(async () => {
          await transporter
            .sendMail({
              from: `"Nalum" <admin@alumninet.in>`,
              to: body.second_email,
              subject: "Nalum Account Verified",
              text: `Congratulations, your Nalum if has been verified. Login now to use the platform.`,
              html: `
              <p>
              Hi,
              <br>
              <br>
              Welcome to Nalum, the NSUT networking platform. We are pleased to inform you that your account as an alumni has been <b>verified</b>.
              <br>
              <br>
              You can login now <a href="${process.env.LINK}/login">here</a> to access your account. Here are a list of features you can try out - 
              <br>
              1. <a href="${process.env.LINK}/profile">Update your profile</a>
              <br>
              2. <a href="${process.env.LINK}/recruitment">Recruit from one of the best engineering college of India, NSUT</a>
              <br>
              3. Search for your fellow batchmates from the small search icon on the top
              <br>
              4. <a href="${process.env.LINK}">Get to know about the upcoming events at the university.</a>
              <br>
              <br>
              We hope you enjoy the platform and wish you all the best for your future endevours.
              <br>
              <br>
              Regards
              <br>
              Team Nalum
              </p>
              `,
            })
            .then((e) =>
              res.json({
                error: false,
                data: newUserData.email,
              })
            );
        });
    } else {
      await transporter
        .sendMail({
          from: `"Nalum" <admin@alumninet.in>`,
          to: body.second_email,
          subject: "Nalum Account Verification Failed",
          text: `Your Nalum profile wasnt verified. Update the documents to request verification again.`,
          html: `
              <p>
              Hi,
              <br>
              <br>
              We are sorry to inform you that your account registeration as an alumni was unsuccessfull. You can try updating the documents at your <a href="${process.env.LINK}/login">bio</a>, this will request verification again.<br>
              <br>
              <br>
              The cause of the failure of verification can be that - 
              <br>
              1. The image doesnt clearly show that you are an exNSUTian
              <br>
              2. Someone else has already registered with your identity.
              <br>
              <br>
              In case of any queries feel free to reach us at admin@alumninet.in
              <br>
              <br>
              Regards
              <br>
              Team Nalum
              </p>
              `,
        })
        .then((e) =>
          res.json({
            error: false,
            data: newUserData.email,
          })
        );
    }
  } else {
    res.json({ error: true, message: "Some Error Occured" });
  }
});

module.exports = router;
