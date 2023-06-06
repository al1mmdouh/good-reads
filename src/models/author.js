const mongoose = require("mongoose");
const { body, check } = require("express-validator");
const { validatePhoto } = require("../utils/validation");

const authorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  dob: {
    type: Date,
    required: true,
  },
  brief: {
    type: String,
    required: true,
  },
});

const Author = mongoose.model("Author", authorSchema);

// TODO: add book validation on id
const authorValidationRules = [
  body("firstName").isString().withMessage("Author first name must be string"),
  body("lastName").isString().withMessage("Author last name must be string"),
  body("dob").isDate().withMessage("Date of birth must be date."),
  body("brief").isString().withMessage("Brief name must be string"),
  body("photo").custom(validatePhoto),
];

const authorUpdateValidationRules = [
  check("firstName")
    .optional()
    .isString()
    .withMessage("Author name must be string"),
  check("lastName")
    .optional()
    .isString()
    .withMessage("Author name must be string"),
  check("dob").optional().isDate().withMessage("Date of birth must be date."),
  check("brief").optional().isString().withMessage("Brief name must be string"),
  check("photo").optional().custom(validatePhoto),
];

module.exports = { Author, authorValidationRules, authorUpdateValidationRules };