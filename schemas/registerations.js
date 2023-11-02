const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  sessions: Array,
  secret: String,
  batch: String,
  bio: String,
  branch: String,
  linkedin: String,
  email: String,
  name: String,
  occupation: Array,
  education: Array,
  projects: Array,
  honors: Array,
  password: String,
  type: String,
  verified: String,
  files: String,
  portfolio: String,
  otp: String,
  api: String,
  image: String,
  applications: Array,
  user_id: String,
  phone: String,
  course: String,
  department: String,
  work_status: String,
  roll: String,
  error: String,
  instagram: String,
  facebook: String,
  verifier: String,
});

const Registrations = mongoose.model("Registration", registrationSchema);

module.exports = Registrations;
