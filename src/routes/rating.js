const { Router } = require("express");

const {
  ratingCreateValidationRules,
  ratingUpdateValidationRules,
} = require("../models/rating");

const  validate  = require("../middlewares/validation");

const { authenticate, checkRole } = require("../middlewares/auth"); // TODO: paths alias import

const {
  addRating,
  getRatingById,
  deleteRating,
  updateRating,
} = require("../controllers/rating");

const rating = Router();

rating.route("/rating").post(
  authenticate,
  checkRole(["reader"]), // user can update all ratings
  validate(ratingCreateValidationRules),
  addRating
);

rating
  .route("/rating/:id")
  .get(authenticate, getRatingById)
  .put(
    authenticate,
    checkRole(["reader"]), // user can update state of shelf
    validate(ratingUpdateValidationRules),
    updateRating
  )
  .delete(authenticate, checkRole(["reader"]), deleteRating); // ?

module.exports = rating;
