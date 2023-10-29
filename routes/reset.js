const bcrypt = require("bcrypt");
const registerations = require("../schemas/registerations");
const otp = require("../schemas/otp");
const express = require("express");
const login = require("../utilities/login");

const router = express.Router();

router.post("/", async (req, res) => {
  let body = req.body;

  try {
    let otpData = await otp.find({ email: body.email });
    if (otpData[0].otp == body.otp) {
      bcrypt.hash(body.password, 10, async function (err, hash) {
        if (err) {
          res.json({ error: true, message: "Some Error Occured" });
        } else {
          await registerations.findOneAndUpdate(
            { email: body.email },
            { password: hash }
          );
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
        }
      });
    }
  } catch {
    res.json({ error: true, message: "Some Error Occured" });
  }
});

module.exports = router;
