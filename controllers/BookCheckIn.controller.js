const express = require("express");
const router = express.Router();

const BookCheckIn = require("../models/bookCheckIN");
const Users = require("../models/user.model");
const Books = require("../models/book.model");
const { generateCrudMethods } = require("../services");
const CheckInCrud = generateCrudMethods(BookCheckIn);
const { validateDbId, raiseRecord404Error } = require("../middlewares");
const mongoose = require("mongoose");

router.get("/", (req, res, next) => {
  CheckInCrud.getAll()
    .then((data) => res.send(data))
    .catch((err) => next(err));
});

router.post("/", (req, res, next) => {
  CheckInCrud.create(req.body)
    .then((data) => res.status(201).json(data))
    .catch((err) => next(err));
});

// router.post("/:userId/:bookId", async (req, res) => {
//   try {
//     const { userId, bookId } = req.params;

//     const user = await Users.findById(userId);
//     console.log(userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const book = await Books.findById(bookId);

//     if (!book) {
//       return res.status(404).json({ message: "Book not found" });
//     }
//     const bookTitle = book.bookTitle;
//     const author = book.author;
//     const publisher = book.publisher;
//     const quantity = book.quantity;

//     const bookCheckIN = new BookCheckIn();
//     bookCheckIN.bookTitle = bookTitle;
//     bookCheckIN.author = author;
//     bookCheckIN.publisher = publisher;
//     bookCheckIN.quantity = quantity;

//     bookCheckIN.save();

//     return res.status(200).json({ message: "Book successfully check-id" });
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({ message: "Internal server error" });
//   }
// });
router.post("/:userId/:bookId", async (req, res) => {
  try {
    const { userId, bookId } = req.params;
    // const { username, bookDetails } = req.body;

    // Verify if the user and book exist in the database
    const user = await Users.findById(userId);
    const book = await Books.findById(bookId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Create a new book check-in entry
    const bookCheckIn = new BookCheckIn();
    bookCheckIn.userId = userId.toString();
    bookCheckIn.bookId = bookId.toString();
    bookCheckIn.bookTitle = book.bookTitle;
    bookCheckIn.author = book.author;
    bookCheckIn.publisher = book.publisher;
    bookCheckIn.quantity = book.quantity;
    bookCheckIn.username = user.username.toString();

    await bookCheckIn.save();

    // Update the user's books array with the book check-in entry
    user.books.push(bookCheckIn);
    await user.save();

    return res
      .status(200)
      .json({
        message: "Book successfully checked in",
        username: user.username.toString(),
      });
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
