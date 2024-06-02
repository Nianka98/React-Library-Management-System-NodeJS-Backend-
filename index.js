const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//local imports
const connectDb = require("./db.js");
const userRoutes = require("./controllers/user.controller");
const bookRoutes = require("./controllers/book.controller");
const BookCheckInRoutes = require("./controllers/BookCheckIn.controller");
const fileupload = require("./middlewares/file-upload");

const { errorHandler } = require("./middlewares");

const app = express();
//middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads/images", express.static(path.join("uploads", "images")));
app.use("/api/user", userRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/BookCheckIn/", BookCheckInRoutes);
app.use(errorHandler);

connectDb()
  .then(() => {
    console.log("db connection succeeded.");
    app.listen(4000, () => console.log("server started at 4000."));
  })
  .catch((err) => console.log(err));
