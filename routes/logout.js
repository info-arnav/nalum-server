const express = require("express");
const registerations = require("../schemas/registerations");

const router = express.Router();

router.post("/", async (req, res) => {
  let body = req.body;
  res.json({ skip: true });
});

module.exports = router;
