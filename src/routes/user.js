const { Router } = require("express");
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/user");

const {
  userCreateValidationRules,
  userUpdateValidationRules,
} = require("../models/user");

const  validate  = require("../middlewares/validation");

const { authenticate, checkRole } = require("../middlewares/auth"); // TODO: paths alias import

const user = Router();

user
  .route("/users")
  .get(getAllUsers)
  .post(
    authenticate,
    checkRole(["reader", "admin"]),
    validate(userCreateValidationRules),
    createUser
  );

user
  .route("/users/:id")
  .get(getUserById)
  .put(
    authenticate,
    checkRole(["reader", "admin"]),
    validate(userUpdateValidationRules),
    updateUser
  )
  .delete(authenticate, checkRole(["reader", "admin"]), deleteUser);
module.exports = user;
