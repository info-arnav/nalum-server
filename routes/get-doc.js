const registerations = require("../schemas/registerations");
const express = require("express");
const authenticate = require("../utilities/authenticate");

const router = express.Router();

router.post("/", async (req, res) => {
  let body = req.body;
  try {
    let auth = authenticate(body.email, body.token);
    if (auth) {
      let userData = await registerations.find({ email: body.email });
      res.json({
        error: false,
        data: userData[0].files,
        error_data: userData[0].error,
        roll: userData[0].roll,
        work_status: userData[0].work_status,
        batch: userData[0].batch,
        department: userData[0].department,
        course: userData[0].course,
        phone: userData[0].phone,
      });
    } else {
      res.json({ error: true, message: "Some Error Occured" });
    }
  } catch {
    res.json({ error: true, message: "Some Error Occured" });
  }
});

module.exports = router;
