const fs = require("fs");
const path = require("path");
const morgan = require("morgan");

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname+"/../", "access.log"),
  {
    flags: "as",
    encoding: "utf-8",
  }
);
// Create a custom Morgan token to log request body
morgan.token("req-body", (req) => {
  return JSON.stringify(req.body);
});

const logger = morgan(
  ":method :url :status :response-time ms - :res[content-length] - :req-body",
  {
    stream: accessLogStream,
  }
);
module.exports = logger;
