const recruitment = require("../schemas/recruitment");
const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  let body = req.body;
  try {
    let postData = await recruitment
      .find({ _id: body.id })
      .select("company title _id");
    res.json({
      error: false,
      data: postData[0],
    });
  } catch {
    res.json({ error: true, message: "Some Error Occured" });
  }
});

module.exports = router;
