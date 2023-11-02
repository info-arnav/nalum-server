const registerations = require("../schemas/registerations");
const express = require("express");
const authenticate = require("../utilities/authenticate");
const code = require("../schemas/codes");

const router = express.Router();

function generateRandomString() {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomString = "";
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    randomString += chars[randomIndex];
  }
  return randomString;
}

router.post("/", async (req, res) => {
  let body = req.body;
  try {
    let auth = authenticate(body.auth_email, body.token);
    let userData = await registerations
      .find({ email: body.auth_email })
      .limit(body.num);
    if (
      auth &&
      userData[0].verified == "true" &&
      userData[0].type == "alumni"
    ) {
      let codeData = await code.find({ owner: body.auth_email });
      let final_code = generateRandomString();
      if (codeData.length == 0) {
        await code.create({
          owner: body.auth_email,
          code: final_code,
        });
      } else {
        final_code = codeData[0].code;
      }
      res.json({ error: false, code: final_code });
    } else {
      res.json({ error: true, message: "Some Error Occured" });
    }
  } catch {
    res.json({ error: true, message: "Some Error Occured" });
  }
});

module.exports = router;
