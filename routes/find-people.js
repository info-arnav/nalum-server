const registerations = require("../schemas/registerations");
const express = require("express");
const authenticate = require("../utilities/authenticate");

const router = express.Router();

router.post("/", async (req, res) => {
  let body = req.body;
  try {
    let auth = authenticate(body.auth_email, body.token);
    let userData = await registerations
      .find({ email: body.auth_email })
      .select("-sessions -secret -password -docs")
      .limit(body.num);
    if (auth && userData[0].verified == "true") {
      res.json({
        error: false,
        data: await registerations.find({
          batch: userData[0].batch,
          verified: "true",
        }),
      });
    } else {
      res.json({ error: true, message: "Some Error Occured" });
    }
  } catch {
    res.json({ error: true, message: "Some Error Occured" });
  }
});

module.exports = router;
