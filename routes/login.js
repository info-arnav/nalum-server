const express = require("express");
const login = require("../utilities/login");

const router = express.Router();

router.post("/", async (req, res) => {
  let body = req.body;
  try {
    let response = await login(body.email, body.password, body.uuid);

    if (response.error == true) {
      res.json(response);
    } else {
      var expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 100);
      res.json({
        error: false,
        key: response.client_token,
        login_key: `login_token=${
          response.server_token
        }; expires=${expirationDate.toUTCString()}; HttpOnly; Secure; SameSite=lax; Path=/`,
      });
    }
  } catch {
    res.json({ error: true, message: "Some Error Occured" });
  }
});

module.exports = router;
