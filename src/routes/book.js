const { Router } = require("express");

const book = Router();


const {
  getAllBooks,
  addBook,
} = require("../controllers/book");


book
  .route("/book")
  .get(getAllBooks) //All can get Books
  .post(addBook);