const recruited = require("../schemas/recruited");
const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  let body = req.body;
  try {
    let postData = await recruited
      .find({ _id: body.id })
      .select("title company _id");
    res.json({
      error: false,
      data: postData[0],
    });
  } catch {
    res.json({ error: true, message: "Some Error Occured" });
  }
});

module.exports = router;
