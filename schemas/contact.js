const { default: mongoose } = require("mongoose");

const contactSchema = new mongoose.Schema({
  title: "Messages",
  properties: {
    _id: {
      bsonType: "objectId",
    },
    email: {
      bsonType: "string",
    },
    message: {
      bsonType: "string",
    },
  },
});

const Contact = mongoose.model("Messages", contactSchema);

module.exports = Contact;
