const { Book } = require("../models/book");


const addBook = async (req, res, next) => {
    try {
      const newBook = await Book.create({
        ...req.body,
        photo: req.file.filename
      });
      if(true){
        res.status(200).json({
          status: "success",
          data: {
            book: newBook,
          },
        });
      }
    } catch (error) {
      next(error);
    }
  };

const getAllBooks = async (req, res, next) => {
    try {
    const { pageNumber } = req.query;
    const booksPerPage = 3;
      const books = await Book.find({})
      .skip((pageNumber - 1) * booksPerPage)
      .limit(booksPerPage);

      res.status(200).json({
        status: "success",
        result: books.length,
        data: {
          books,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  const getAllBooksInOnePage = async (req, res, next) => {
    try {
      const books = await Book.find({})
      res.status(200).json({
        status: "success",
        result: books.length,
        data: {
          books,
        },
      });
    } catch (error) {
      next(error);
    }
  };


  const getBookById = async (req, res, next) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({
          status: "fail",
          message: "Book not Found",
        });
      }
      res.status(200).json({
        status: "success",
        data: {
          book,
        },
      });
    } catch (error) {
      next(error);
    }
  };



  const updateBook = async (req, res, next) => {
    console.log(req.body);
    try {
      const update = { ...req.body };
      if (req.file) {
        update.photo = req.file.filename;
      }
      const book = await Book.findByIdAndUpdate(req.params.id, update, {
        new: true,
        runValidators: true,
      });
      if (!book) {
        return res.status(404).json({
          status: "fail",
          message: "Book not Found",
        });
      }
      res.status(200).json({
        status: "success",
        data: {
          book,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  const deleteBook = async (req, res, next) => {
    try {
      const book = await Book.findByIdAndDelete(req.params.id);
      if (!book) {
        return res.status(404).json({
          status: "fail",
          message: "Book not Found",
        });
      }
      res.status(200).json({
        status: "success",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  };
// search feature

  const getSearch = async (req, res,next) => {

    const {bookname} =req.params
    try {
      const totalbooks = await Book.find()
      .populate("author")
      .populate("category");
    
    const respons = [];
    
    await totalbooks.map(async (book) => {
          if (
            book.name.includes(bookname) ||
            book.author.firstName.includes(bookname) ||
            book.category.fullname.includes(bookname)
          ) {
            respons.push(book);
          }
        })
    
        res.status(200).json({
          status: "success",
          data: {
            respons,
          },
        });
        
    
    } catch (error) {
      next(error)
    }}
  
  


module.exports = {
    getAllBooks,
    addBook,
    getAllBooksInOnePage,
    getBookById,
    updateBook,
    deleteBook,
    getSearch,
};