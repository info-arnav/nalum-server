const imagesSchema = require("../schemas/images");
const image = require("../utilities/image");
const express = require("express");

const router = express.Router();

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const images = await imagesSchema.find({ id: id });
    if (images.length > 0) {
      res.json({ image: images[0].image });
    } else {
      res.json({ image: image.data });
    }
  } catch {
    res.json({ image: image.data });
  }
});

module.exports = router;
