const mongoose = require("mongoose");

const eventsSchema = new mongoose.Schema({
  title: String,
  link: String,
  linkText: String,
  image: String,
  details: String,
});

const Events = mongoose.model("Events", eventsSchema);

module.exports = Events;
