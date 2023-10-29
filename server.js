const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const status = require("./routes/status");
const image = require("./routes/images");
const otpSend = require("./routes/otp-send");
const otpVerify = require("./routes/otp-verify");
const login = require("./routes/login");
const register = require("./routes/register");
const reset = require("./routes/reset");
const logout = require("./routes/logout");
const updateInfo = require("./routes/update-info");
const resetOtpSend = require("./routes/reset-otp-send");
const getDoc = require("./routes/get-doc");
const setDoc = require("./routes/set-doc");
const findPeople = require("./routes/find-people");
const sendInvite = require("./routes/send-invite");
const getUserInfo = require("./routes/get-user-info");
const setProfilePicture = require("./routes/set-profile-picture");
const updateProfile = require("./routes/update-profile");
const requestsAction = require("./routes/requests-action");
const requests = require("./routes/requests");
const editPortfolioItem = require("./routes/edit-portfolio-item");
const contact = require("./routes/contact");
const findRecruitment = require("./routes/find-recruitments");
const createRecruitment = require("./routes/create-recruitment");
const deleteRecruitment = require("./routes/delete-recruitment");
const editRecruitment = require("./routes/edit-recruitments");

require("dotenv").config();

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.raw({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

MONGODB_URL = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => {
    console.error(error);
  });

app.use("/status", status);
app.use("/images", image);
app.use("/otp-send", otpSend);
app.use("/otp-verify", otpVerify);
app.use("/register", register);
app.use("/login", login);
app.use("/reset", reset);
app.use("reset-otp-send", resetOtpSend);
app.use("logout", logout);
app.use("/update-info", updateInfo);
app.use("/get-doc", getDoc);
app.use("/set-doc", setDoc);
app.use("/find-people", findPeople);
app.use("/send-invite", sendInvite);
app.use("/get-user-info", getUserInfo);
app.use("/set-profile-picture", setProfilePicture);
app.use("/update-profile", updateProfile);
app.use("/requests-action", requestsAction);
app.use("/requests", requests);
app.use("/edit-portfolio-item", editPortfolioItem);
app.use("/contact", contact);
app.use("/find-recruitments", findRecruitment);
app.use("/create-recruitment", createRecruitment);
app.use("/delete-recruitment", deleteRecruitment);
app.use("/edit-recruitments", editRecruitment);
app.use("/", (req, res) => {
  res.json({ error: true, message: "Unautherized Access" });
});

app.listen(5000);
