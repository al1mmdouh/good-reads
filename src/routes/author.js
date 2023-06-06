const { Router } = require("express");
const author = Router();

const {
  authorValidationRules,
  authorUpdateValidationRules,
} = require("../models/author");

const {
  getAllAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  getAuthorById,
} = require("../controllers/author");

const { validate } = require("../middlewares/validation");
const { authenticate, checkRole } = require("../middlewares/auth");

const multer = require("multer");
const { multerFilter, multerStorageAuthor } = require("../middlewares/multer");
const upload = multer({
  storage: multerStorageAuthor,
  fileFilter: multerFilter,
});

// TODO: Add remaining methods --> post put delete & get by id
author
  .route("/author")
  .get(getAllAuthors) // All can get authors
  .post(
    authenticate, // Admin only can create author
    checkRole(["admin"]),
    upload.single("photo"), // Multer middleware for file upload
    validate(authorValidationRules),
    createAuthor
  );

author
  .route("/author/:id")
  .get(getAuthorById) // All can get author by id
  .put(
    authenticate, // Admin only can edit author
    checkRole(["admin"]),
    upload.single("photo"), // Multer middleware for file upload
    validate(authorUpdateValidationRules),
    updateAuthor
  )
  .delete(authenticate, checkRole(["admin"]), deleteAuthor); // Admin only can delete author

module.exports = author;