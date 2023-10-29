const CryptoJS = require("crypto-js");
const registerations = require("../schemas/registerations");
const bcrypt = require("bcrypt");

const comparePassword = (password, hashedPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const login = async (email, password, uuid) => {
  try {
    let userData = await registerations.find({ email: email });
    if (userData.length > 0) {
      let res = await comparePassword(password, userData[0].password);
      if (res) {
        let server_token = `${CryptoJS.AES.encrypt(uuid, userData[0].secret)}`;
        await registerations.findOneAndUpdate(
          { email: email },
          { $push: { sessions: server_token } }
        );
        return {
          error: false,
          server_token: server_token,
          client_token: CryptoJS.AES.encrypt(
            JSON.stringify({
              email: email,
              type: userData[0].type,
              id: userData[0]._id,
              verified: userData[0].verified,
            }),
            process.env.SECRET
          ).toString(),
        };
      } else {
        return { error: true, message: "Password incorrect" };
      }
    } else {
      return { error: true, message: "User not found" };
    }
  } catch (error) {
    return { error: true, message: "Some Error Occurred" };
  }
};

module.exports = login;
