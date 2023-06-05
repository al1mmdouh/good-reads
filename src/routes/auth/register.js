const express = require("express");
const registerUser = require("../../controllers/auth/register");
const { validate } = require("../../middlewares/validation");
const { userCreateValidationRules } = require("../../models/user");

const register = express.Router();

// validate input FullName, email, password
register
  .route("/auth/register")
  .post(validate(userCreateValidationRules), registerUser);

module.exports = register;
