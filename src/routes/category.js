const { Router } = require("express");

const {
  getAllCategories,
  getCategoryById,
  deleteCategory,
  createCategory,
  updateCategory,
} = require("../controllers/category");

const { categoryValidationRules } = require("../models/category");

const  validate  = require("../middlewares/validation");

const { authenticate, checkRole } = require("../middlewares/auth");

category = new Router();

category
  .route("/category")
  .get(getAllCategories) //All can get categories
  .post(
    authenticate,
    checkRole(["admin"]), //Admin only can create category
    validate(categoryValidationRules),
    createCategory
  );

category
  .route("/category/:id")
  .get(getCategoryById) //All can get category by id
  .put(
    authenticate,
    checkRole(["admin"]), //Admin only can edit category
    validate(categoryValidationRules),
    updateCategory
  )
  .delete(
    authenticate,
     checkRole(["admin"]),
      deleteCategory); //Admin only can delete category

module.exports = category;
