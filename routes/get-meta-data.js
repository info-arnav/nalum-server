const registerations = require("../schemas/registerations");
const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  let body = req.body;
  try {
    let userData = await registerations
      .find({ _id: body.id })
      .select("name verified _id type");
    res.json({
      error: false,
      data: userData[0],
    });
  } catch {
    res.json({ error: true, message: "Some Error Occured" });
  }
});

module.exports = router;
