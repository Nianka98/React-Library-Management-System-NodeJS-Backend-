const express = require("express");
const router = express.Router();
const Books = require("../models/book.model");
const { generateCrudMethods } = require("../services");
const bookCrud = generateCrudMethods(Books);
const { validateDbId, raiseRecord404Error } = require("../middlewares");
const multer = require("multer");
const fileUpload = require("../middlewares/file-upload");

// Create a new book with an image
router.post("/", fileUpload.single("image"), (req, res, next) => {
  // Access the uploaded file through req.file
  const { bookTitle, author, publisher, quantity } = req.body;
  const image = req.file.path; // Access the image

  const bookData = {
    bookTitle,
    author,
    publisher,
    quantity,
    image,
  };

  bookCrud
    .create(bookData)
    .then((data) => res.status(201).json(data))
    .catch((err) => next(err));
});

router.get("/", (req, res, next) => {
  bookCrud
    .getAll()
    .then((data) => res.send(data))
    .catch((err) => next(err));
});

router.get("/:id", validateDbId, (req, res, next) => {
  bookCrud
    .getById(req.params.id)
    .then((data) => {
      if (data) res.send(data);
      else raiseRecord404Error(req, res);
    })
    .catch((err) => next(err));
});

// router.post("/", (req, res, next) => {
//   bookCrud
//     .create(req.body)
//     .then((data) => res.status(201).json(data))
//     .catch((err) => next(err));
// });

router.put("/:id", validateDbId, (req, res) => {
  bookCrud
    .update(req.params.id, req.body)
    .then((data) => {
      if (data) res.send(data);
      else raiseRecord404Error(req, res);
    })
    .catch((err) => next(err));
});

router.delete("/:id", validateDbId, (req, res) => {
  bookCrud
    .delete(req.params.id)
    .then((data) => {
      if (data) res.send(data);
      else raiseRecord404Error(req, res);
    })
    .catch((err) => next(err));
});

module.exports = router;
