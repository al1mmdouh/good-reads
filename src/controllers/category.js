const { Category } = require("../models/book");
const { Book } = require("../models/category");

const getAllCategories = async (_req, res, next) => {
  try {
    const categories = await Category.find({});

    res.status(200).json({
      status: "success",
      result: categories.length,
      data: {
        categories,
      },
    });
  } catch (error) {
    next(error);
  }
};