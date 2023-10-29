const mongoose = require("mongoose");

const recruitedSchema = new mongoose.Schema({
  stipend: String,
  title: String,
  description: String,
  company: String,
  email: String,
  link: String,
  date: String,
  location: String,
  duration: String,
  applicants: [String],
  deadline: String,
});

const Recruited = mongoose.model("Recruited", recruitedSchema);

module.exports = Recruited;
