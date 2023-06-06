const { Rating } = require("../models/rating");
// shelf is a single unit
const addRating = async (req, res, next) => {
  try {
    // book id + state , auth --> req --> userId
    const newRating = await Rating.create({
      ...req.body,
      user: req.userId,
    });

    res.status(201).json({
      status: "success",
      data: {
        rating: newRating,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getRatingById = async (req, res, next) => {
  try {
    const rating = await Rating.findById(req.params.id).populate({
      path: "book",
      select: "photo name title",
      populate: {
        path: "author",
        select: "firstName lastName",
      },
    });

    if (!rating) {
      return res.status(404).json({
        status: "fail",
        message: "Rating not Found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        rating,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateRating = async (req, res, next) => {
  try {
    const rating = await Rating.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!rating) {
      return res.status(404).json({
        status: "fail",
        message: "Rating not Found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        rating,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteRating = async (req, res, next) => {
  try {
    const rating = await Rating.findByIdAndDelete(req.params.id);
    if (!rating) {
      return res.status(404).json({
        status: "fail",
        message: "Rating not Found",
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


module.exports = {
  addRating,
  getRatingById,
  deleteRating,
  updateRating,
};
