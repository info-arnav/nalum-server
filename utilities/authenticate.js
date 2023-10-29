const registerations = require("../schemas/registerations");
const CryptoJS = require("crypto-js");

const auth = async (email, otoken) => {
  try {
    let tempUserData = await registerations.find({ email: email });
    const mid_token = CryptoJS.AES.decrypt(otoken, tempUserData[0].secret);
    const token = mid_token.toString(CryptoJS.enc.Utf8);
    if (token && tempUserData[0].sessions.indexOf(otoken) != -1) {
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
};

module.exports = auth;
