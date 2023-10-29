const bcrypt = require("bcrypt");
const crypto = require("crypto");
const registerations = require("../schemas/registerations");
const verifiedSchema = require("../schemas/verified");
const otp = require("../schemas/otp");
const express = require("express");
const algoliasearch = require("algoliasearch");
const login = require("../utilities/login");

const router = express.Router();

router.post("/", async (req, res) => {
  const client = algoliasearch(
    process.env.ALGOLIA_MAIN,
    process.env.ALGOLIA_PRIVATE
  );
  const index = client.initIndex("dev_alum");
  let body = req.body;

  try {
    let otpData = await otp.find({ email: body.email });
    if (otpData[0].otp == body.otp) {
      bcrypt.hash(body.password, 10, async function (err, hash) {
        let verified;
        let type;

        if (
          body.email.split("@")[1] == "nsut.ac.in" &&
          body.type == "student"
        ) {
          verified = "true";
          type = "student";
        } else {
          const verifiedData = await verifiedSchema.find({ email: body.email });
          try {
            if (verifiedData[0].email == body.email) {
              verified = "true";
              type = "alumni";
            } else {
              verified = "false";
              type = "alumni";
            }
          } catch {
            verified = "false";
            type = "alumni";
          }
        }
        let secret = crypto
          .randomBytes(Math.ceil(32 / 2))
          .toString("hex")
          .slice(0, 32);
        await registerations.create({
          email: body.email,
          password: hash,
          files: body.files,
          applications: [],
          honors: [],
          projects: [],
          education: [],
          occupation: [],
          error: "",
          phone: body.phone,
          course: body.course,
          department: body.department,
          batch: body.batch,
          work_status: body.work_status,
          roll: body.roll,
          verified: verified,
          type: type,
          secret: secret,
          sessions: [],
        });
        if (verified == "true") {
          let registeredUserData = await registerations.find({
            email: body.email,
          });
          await index.saveObjects([
            {
              type: type,
              email: body.email,
              objectID: registeredUserData[0]._id,
              image: `${process.env.LINK}api/image/${registeredUserData[0]._id}`,
            },
          ]);
        }
        let response = await login(body.email, body.password, body.uuid);

        if (response.error == true) {
          res.json(response);
        } else {
          var expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 100);
          res.json({
            error: false,
            key: response.client_token,
            login_key: `login_token=${
              response.server_token
            }; expires=${expirationDate.toUTCString()}; HttpOnly; Secure; SameSite=lax; Path=/`,
          });
        }
      });
    } else {
      res.json({ error: true, message: "Invalid OTP" });
    }
  } catch {
    res.json({ error: true, message: "Some Error Occured" });
  }
});

module.exports = router;
