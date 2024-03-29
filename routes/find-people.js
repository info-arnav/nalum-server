const registerations = require("../schemas/registerations");
const express = require("express");
const authenticate = require("../utilities/authenticate");

const router = express.Router();

router.post("/", async (req, res) => {
  let body = req.body;
  try {
    let auth = authenticate(body.auth_email, body.token);
    let userData = await registerations.find({ email: body.auth_email });

    if (auth && userData[0].verified == "true") {
      let searchData = {
        batch: userData[0].batch,
        verified: "true",
      };
      if (userData[0].type == "admin") {
        delete searchData.batch;
      }
      res.json({
        error: false,
        data: await registerations
          .find(searchData)
          .select("_id -sessions -files -secret -password -files")
          .sort({ _id: -1 })
          .limit(body.num),
      });
    } else {
      res.json({ error: true, message: "Some Error Occured" });
    }
  } catch {
    res.json({ error: true, message: "Some Error Occured" });
  }
});

module.exports = router;
