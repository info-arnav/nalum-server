const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  message: {
    type: String,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
