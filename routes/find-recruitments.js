const registerations = require("../schemas/registerations");
const recruitments = require("../schemas/recruitment");
const express = require("express");
const authenticate = require("../utilities/authenticate");

const router = express.Router();

router.post("/", async (req, res) => {
  let body = req.body;
  let auth = authenticate(body.auth_email, body.token);
  let userData = await registerations.find({ email: body.auth_email });
  if (auth && userData[0].verified == "true") {
    if (body.email) {
      const data = await recruitments
        .find({ email: body.email })
        .sort({ _id: -1 });
      res.json({ error: false, data: data || [] });
    } else {
      const data = await recruitments.find({});
      res.json({ error: false, data: data || [] });
    }
  } else {
    res.json({ error: true, message: "Some Error Occured" });
  }
});

module.exports = router;
