const mongoose = require("mongoose");

const recruitmentSchema = new mongoose.Schema({
  stipend: String,
  title: String,
  description: String,
  company: String,
  email: String,
  link: String,
  date: String,
  location: String,
  duration: String,
  applicants: Array,
  deadline: String,
});

const Recruitment = mongoose.model("Recruitment", recruitmentSchema);

module.exports = Recruitment;
