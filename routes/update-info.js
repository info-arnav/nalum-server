const CryptoJS = require("crypto-js");

const registerations = require("../schemas/registerations");

const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  let body = req.body;
  try {
    let tempUserData = await registerations.find({ email: body.email });
    const mid_token = CryptoJS.AES.decrypt(body.token, tempUserData[0].secret);
    const token = mid_token.toString(CryptoJS.enc.Utf8);
    if (
      token == body.uuid &&
      tempUserData[0].sessions.indexOf(body.token) != -1
    ) {
      res.json({
        error: false,
        loggedIn: true,
        newData: {
          email: body.email,
          type: tempUserData[0].type,
          verified: tempUserData[0].verified,
          id: tempUserData[0]._id,
        },
        key: CryptoJS.AES.encrypt(
          JSON.stringify({
            email: body.email,
            type: tempUserData[0].type,
            verified: tempUserData[0].verified,
            id: tempUserData[0]._id,
          }),
          process.env.SECRET
        ).toString(),
      });
    } else {
      res.json({ loggedIn: false });
    }
  } catch {
    res.json({ loggedIn: true, error: "Some error occured" });
  }
});

module.exports = router;
