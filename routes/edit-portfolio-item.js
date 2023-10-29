const registerations = require("../schemas/registerations");
const express = require("express");
const authenticate = require("../utilities/authenticate");

const router = express.Router();

router.post("/", async (req, res) => {
  let body = req.body;

  let auth = authenticate(body.email, body.token);
  let userData = await registerations.find({ email: body.email });
  if (auth && userData[0].verified == "true") {
    if (body.delete) {
      let obj = {};
      obj[body.type] = body.data;
      await registerations.findOneAndUpdate(
        {
          email: body.email,
        },
        { $pull: obj }
      );
    } else if (!body.edit) {
      let obj = {};
      obj[body.type] = body.data;
      await registerations.findOneAndUpdate(
        {
          email: body.email,
        },
        { $push: obj }
      );
    } else {
      let obj1 = {};
      let obj2 = {};
      obj1[`${body.type}.title`] = body.oldData.title;
      obj1[`${body.type}.subTitle`] = body.oldData.subTitle;
      obj1[`${body.type}.description`] = body.oldData.description;
      obj1[`${body.type}.duration`] = body.oldData.duration;
      obj1["email"] = body.email;
      obj2[`${body.type}.$.title`] = body.data.title;
      obj2[`${body.type}.$.subTitle`] = body.data.subTitle;
      obj2[`${body.type}.$.description`] = body.data.description;
      obj2[`${body.type}.$.duration`] = body.data.duration;
      await registerations.findOneAndUpdate(obj1, {
        $set: obj2,
      });
    }
    let data = await registerations.find({
      email: body.email,
    });
    res.json({ error: false, data: data[0] });
  } else {
    res.json({ error: true, message: "Some Error Occured" });
  }
});

module.exports = router;
