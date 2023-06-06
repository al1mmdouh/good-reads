const mongoose = require("mongoose");


const bookSchema = new mongoose.Schema({
    photo: { type: String, required: true },
    name: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
  });
  
  const Book = mongoose.model("Book", bookSchema); // books --> Book

  module.exports = {Book};
  