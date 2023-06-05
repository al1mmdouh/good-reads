const express = require("express");
const loginController = require("../../controllers/auth/login");

const login = express.Router();

login.route("/auth/login").post(loginController);

module.exports = login;
