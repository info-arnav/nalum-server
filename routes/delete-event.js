const registerations = require("../schemas/registerations");
const express = require("express");
const authenticate = require("../utilities/authenticate");
const Events = require("../schemas/events");
const Images = require("../schemas/images");

const router = express.Router();

router.post("/", async (req, res) => {
  let body = req.body;
  let auth = authenticate(body.email, body.token);
  let userData = await registerations.find({ email: body.email });
  if (auth && userData[0].type == "admin") {
    await Events.findOneAndRemove({ _id: body.id });
    await Images.findOneAndRemove({ id: body.id });
    res.json({ error: false, data: "true" });
  } else {
    res.json({ error: true, message: "Some Error Occured" });
  }
});

module.exports = router;
