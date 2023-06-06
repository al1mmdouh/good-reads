const { Router } = require("express");

const book = Router();


const {
  getAllBooks,
  addBook,
  getAllBooksInOnePage,
  getBookById,
  updateBook,
  deleteBook
} = require("../controllers/book");

const {
    bookCreationValidationRules,
    bookUpdateValidationRules,
  } = require("./../models/book");


const { validate } = require("../middlewares/validation");

const { authenticate, checkRole } = require("../middlewares/auth");

const { multerFilter, multerStorageBook } = require("../Middlewares/multer");
const upload = multer({
  storage: multerStorageBook,
  fileFilter: multerFilter,
});


book
  .route("/book")
  .get(getAllBooks) //All can get Books
  .post(
    authenticate,
    checkRole(["admin"]), //Admin only can create book
    upload.single("photo"),// Multer middleware for file upload
    validate(bookCreationValidationRules),
    addBook
  );


  book
  .route("/books")
  .get(
    authenticate,
    checkRole(["admin"]), //Admin only can create book
    validate(bookCreationValidationRules),
    getAllBooksInOnePage //All can get Books
    ); //All can get Books


  book
  .route("/book/:id")
  .get(getBookById) //All can get Books by id
  .put(
    authenticate,
    checkRole(["admin"]), //Admin only can edit book
    upload.single("photo"),// Multer middleware for file upload
    validate(bookUpdateValidationRules),
    updateBook
  )
  .delete(
    authenticate,
     checkRole(["admin"]),
      deleteBook); //Admin only can delete book







  module.exports = book;