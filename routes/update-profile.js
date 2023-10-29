const registerations = require("../schemas/registerations");
const express = require("express");
const authenticate = require("../utilities/authenticate");
const algoliasearch = require("algoliasearch");

const router = express.Router();

router.post("/", async (req, res) => {
  let body = req.body;
  const client = algoliasearch(
    process.env.ALGOLIA_MAIN,
    process.env.ALGOLIA_PRIVATE
  );
  const index = client.initIndex("dev_alum");

  let auth = authenticate(body.email, body.token);
  let userData = await registerations.find({ email: body.email });
  if (auth && userData[0].verified == "true") {
    await registerations.findOneAndUpdate(
      { email: body.email },
      {
        bio: body.bio,
        name: body.name,
        batch: body.batch,
        linkedin: body.linkedin,
        facebook: body.facebook,
        instagram: body.instagram,
      }
    );
    await index
      .partialUpdateObjects([
        {
          objectID: userData[0]._id,
          bio: body.bio,
          name: body.name,
          batch: body.batch,
        },
      ])
      .then(({ objectIDs }) => {
        res.json({
          error: false,
          data: {
            bio: body.bio,
            name: body.name,
            batch: body.batch,
            linkedin: body.linkedin,
            facebook: body.facebook,
            instagram: body.instagram,
          },
        });
      });
  } else {
    res.json({ error: true, message: "Some Error Occured" });
  }
});

module.exports = router;
