const { Router } = require("express");

const {
  shelfCreateValidationRules,
  shelfUpdateValidationRules,
  shelfQueryValidationRules,
} = require("../models/shelf");

const validate = require("../middlewares/validation");

const { authenticate, checkRole } = require("../middlewares/auth"); // TODO: paths alias import

const {
  addShelf,
  getShelfById,
  deleteShelf,
  updateShelf,
  getAllUserShelves,
} = require("../controllers/shelf");

const shelf = Router();

shelf
  .route("/shelf")
  .get(authenticate, validate(shelfQueryValidationRules), getAllUserShelves) // must be registered to get all books
  .post(
    authenticate,
    checkRole(["reader"]), // user can get all shelves
    validate(shelfCreateValidationRules),
    addShelf
  );

shelf
  .route("/shelf/:id")
  .get(authenticate, getShelfById)
  .put(
    authenticate,
    checkRole(["reader"]), // user can update state of shelf
    validate(shelfUpdateValidationRules),
    updateShelf
  )
  .delete(authenticate, checkRole(["reader"]), deleteShelf); // ?

module.exports = shelf;
