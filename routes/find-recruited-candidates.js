const registerations = require("../schemas/registerations");
const recruited = require("../schemas/recruited");
const express = require("express");
const authenticate = require("../utilities/authenticate");

const router = express.Router();

router.post("/", async (req, res) => {
  let body = req.body;
  let auth = authenticate(body.auth_email, body.token);
  let userData = await registerations.find({ email: body.auth_email });
  if (auth && userData[0].verified == "true" && userData[0].type == "alumni") {
    body.email = body.auth_email;
    delete body.auth_email;
    delete body.token;
    res
      .json({ error: false, data: await recruited.find(body) })
      .sort({ _id: -1 });
  } else {
    res.json({ error: true, message: "Some Error Occured" });
  }
});

module.exports = router;
