const contact = require("../schemas/contact");
const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  let body = req.body;
  try {
    await contact.create({
      email: body.email,
      message: body.message,
    });
    res.json({ error: false, message: "Message Successfully Sent" });
  } catch {
    res.json({ error: true, message: "Some Error Occured" });
  }
});

module.exports = router;
