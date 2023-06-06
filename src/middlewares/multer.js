const multer = require("multer");

const createStorageConfig = (destination, generateFileName) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      const fileName = generateFileName(req, file); // Generate the file name using the provided callback function
      cb(null, fileName);
    },
  });
};

const multerFilter = (_req, file, cb) => {
    const allowedFormats = ["image/png", "image/jpg", "image/jpeg"];
    if (allowedFormats.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only .png, .jpg and .jpeg format allowed!"), false);
    }
  };

  const multerStorageBook = createStorageConfig(
    "src/assets/images/books",
    (req, file) => {
      const ext = file.mimetype.split("/")[1];
      const fileName = `${Date.now()}-image-book-${req.body.name}.${ext}`; // Set the file name for books
      return fileName;
    }
  );

  module.exports = { multerFilter, multerStorageBook};