const contacts = require("../schemas/contact");
const express = require("express");
const authenticate = require("../utilities/authenticate");
const registerations = require("../schemas/registerations");

const router = express.Router();

router.post("/", async (req, res) => {
  let body = req.body;
  try {
    let auth = authenticate(body.auth_email, body.token);
    let userData = await registerations.find({ email: body.auth_email });
    if (auth && userData[0].verified == "true" && userData[0].type == "admin") {
      res.json({
        error: false,
        data: await contacts.find({}).sort({ _id: -1 }),
      });
    } else {
      res.json({ error: true, message: "Some Error Occured" });
    }
  } catch {
    res.json({ error: true, message: "Some Error Occured" });
  }
});

module.exports = router;
