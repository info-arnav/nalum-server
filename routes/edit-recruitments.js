const registerations = require("../schemas/registerations");
const recruitments = require("../schemas/recruitment");
const express = require("express");
const authenticate = require("../utilities/authenticate");

const router = express.Router();

router.post("/", async (req, res) => {
  let body = req.body;
  let auth = authenticate(body.email, body.token);
  let userData = await registerations.find({ email: body.email });
  if (auth && userData[0].verified == "true" && userData[0].type == "alumni") {
    let email = body.email;
    let id = body.id;
    delete body.email;
    delete body.id;
    delete body.token;
    let data = await recruitments.findOneAndUpdate(
      {
        email: email,
        _id: id,
      },
      body
    );
    res.json({ error: false, data: data });
  } else {
    res.json({ error: true, message: "Some Error Occured" });
  }
});

module.exports = router;
