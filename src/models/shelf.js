const mongoose = require("mongoose");
const { check, body, query } = require("express-validator");
const { validateCustomId } = require("../utils/validation");
const { Book } = require("./../models/book");

//states -> 0 "want to read", 1 "currently reading",
const shelfSchema = new mongoose.Schema({
  state: {
    type: Number,
    enum: [0, 1, 2], // "want to read", "currently reading", "read"
    default: 2,
    required: true,
  },
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Shelf = mongoose.model("Shelf", shelfSchema);

const shelfCreateValidationRules = [
  body("state").isNumeric().withMessage("state must be number"),

  body("book").custom(async (value) => {
    await validateCustomId(Book, value);
  }),
];

const shelfUpdateValidationRules = [
  check("state").optional().isNumeric().withMessage("state must be number"),

  check("book")
    .optional()
    .custom(async (value) => {
      await validateCustomId(Book, value);
    }),
];

const shelfQueryValidationRules = [
  query("state").optional().isNumeric().withMessage("state must be number"),
];

module.exports = {
  Shelf,
  shelfCreateValidationRules,
  shelfUpdateValidationRules,
  shelfQueryValidationRules,
};
