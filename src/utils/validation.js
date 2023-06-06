const mongoose = require("mongoose");

const validateCustomId = async (model, id) => {
  const objectId = new mongoose.Types.ObjectId(id);
  const results = await model.findById(objectId);

  if (!results) {
    throw new Error(`No ${model.modelName} found with id ${id}`);
  }

  return true;
};

const validatePhoto = (value, { req }) => {
  if (!req.file) {
    throw new Error("Photo is required");
  }

  const photo = req.file;
  if (!photo.mimetype.startsWith("image")) {
    throw new Error("Invalid file type. Only image files are allowed.");
  }

  return true;
};

module.exports = { validateCustomId, validatePhoto };
