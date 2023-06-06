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
const login = require("./routes/auth/login");
const register = require("./routes/auth/register");
const user = require("./routes/user");
const { addAdmin } = require("./models/user");
const category = require("./routes/category");
const author = require("./routes/author");
const book = require("./routes/book");
const shelf = require("./routes/shelf");
const rating = require("./routes/rating");
const book = require("./Routers/book");

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

//register route
app.use(register);

//login route
app.use(login);

//book route
app.use(book);

// user route
app.use(user);

// user route
app.use(shelf);

// user route
app.use(rating);

//category route
app.use(category);

//author route
app.use(author);

// not fount route
app.use(notfound);

// error middleware
app.use(error);

// DB SERVER RUN
mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() => {
    console.log("DB Connected");
    addAdmin();
    app.listen(process.env.PORT, () => {
      console.log(`Server started at port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log("DB Connection Error." + err));
