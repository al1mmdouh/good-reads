// REQUIRES
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const logger = require("./middlewares/morgan");
const notfound = require("./routes/notfound");
const error = require("./middlewares/error");

// EXPRESS SERVER
const app = express();

// MW
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ROUTES

// morgan logger
app.use(logger);

// not fount route
app.use(notfound);

// error middleware
app.use(error);

// DB SERVER RUN
mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() => {
    console.log("DB Connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server started at port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log("DB Connection Error." + err));
