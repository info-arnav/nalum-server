const registerations = require("../schemas/registerations");
const express = require("express");
const authenticate = require("../utilities/authenticate");

const router = express.Router();

router.post("/", async (req, res) => {
  let body = req.body;

  let auth = authenticate(body.email, body.token);
  let userData = await registerations.find({ email: body.email });
  if (auth && userData[0].verified == "true" && userData[0].type == "admin") {
    let data = await registerations
      .find({
        email: body.find_email,
      })
      .select("files")
      .limit(10);
    res.json({ error: false, data: data[0].files });
  } else {
    res.json({ error: true, message: "Some Error Occured" });
  }
});

module.exports = router;
