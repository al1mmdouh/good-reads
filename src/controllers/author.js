const { Author } = require("../models/author");
const { Book } = require("../models/book");

//create author
const createAuthor = async (req, res, next) => {
  try {
    const newAuthor = await Author.create({
      ...req.body,
      // photo: req.file.path,
      photo: "/assets/img/authors/" + req.file.filename,
    });
    res.status(201).json({
      status: "success",
      data: {
        author: newAuthor,
      },
    });
  } catch (error) {
    next(error);
  }
};

//update author
const updateAuthor = async (req, res, next) => {
  try {
    const update = { ...req.body };
    if (req.file) {
      // update.photo = req.file.path;
      update.photo = "/assets/img/authors/" + req.file.filename;
    }

    const author = await Author.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });

    if (!author) {
      return res.status(404).json({
        status: "fail",
        message: "Author not Found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        author,
      },
    });
  } catch (error) {
    next(error);
  }
};

//delete author
const deleteAuthor = async (req, res, next) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);

    if (!author) {
      return res.status(404).json({
        status: "fail",
        message: "Author not Found",
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

//getAllAuthors
const getAllAuthors = async (_req, res, next) => {
  try {
    const authors = await Author.find({});

    res.status(200).json({
      status: "success",
      result: authors.length,
      data: {
        authors,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAuthorById = async (req, res, next) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({
        status: "fail",
        message: "Author not Found",
      });
    }
    const books = await Book.find({ author: author._id }).populate({
      path: "author",
      select: "name",
    });
    res.status(200).json({
      status: "success",
      data: {
        author,
        books,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  getAuthorById,
};