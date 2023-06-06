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


book
  .route("/book")
  .get(getAllBooks) //All can get Books
  .post(addBook);


  book
  .route("/books")
  .get(getAllBooksInOnePage) //All can get Books

  book
  .route("/book/:id")
  .get(getBookById) //All can get Books by id
  .put(updateBook)
  .delete(deleteBook);







  module.exports = book;