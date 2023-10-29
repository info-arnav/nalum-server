const registerations = require("../schemas/registerations");
const images = require("../schemas/images");
const express = require("express");
const authenticate = require("../utilities/authenticate");

const router = express.Router();

router.post("/", async (req, res) => {
  let body = req.body;
  try {
    let auth = authenticate(body.email, body.token);
    let userData = await registerations.find({ email: body.email });
    if (auth && userData[0].verified == "true" && body.id == userData[0]._id) {
      let imageData = await images.find({ id: body.id });
      if (imageData.length == 0) {
        await images.create({ id: body.id, image: body.image });
      } else {
        await images.findOneAndUpdate({ id: body.id }, { image: body.image });
      }
      res.json({
        error: false,
        data: imageData,
      });
    } else {
      res.json({ error: true, message: "Some Error Occured" });
    }
  } catch {
    res.json({ error: true, message: "Some Error Occured" });
  }
});

module.exports = router;
