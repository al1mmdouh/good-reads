const { Router } = require("express");

const book = Router();


const {
  getAllBooks,
  addBook,
  getAllBooksInOnePage,
} = require("../controllers/book");


book
  .route("/book")
  .get(getAllBooks) //All can get Books
  .post(addBook);


  book
  .route("/books")
  .get(getAllBooksInOnePage) //All can get Books








  module.exports = book;