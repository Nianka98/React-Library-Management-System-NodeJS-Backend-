const express = require("express");
const router = express.Router();

const Users = require("../models/user.model");
const Books = require("../models/book.model");
const { generateCrudMethods } = require("../services");
const userCrud = generateCrudMethods(Users);
const { validateDbId, raiseRecord404Error } = require("../middlewares");

router.get("/", (req, res, next) => {
  userCrud
    .getAll()
    .then((data) => res.send(data))
    .catch((err) => next(err));
});

router.get("/:id", validateDbId, (req, res, next) => {
  userCrud
    .getById(req.params.id)
    .then((data) => {
      if (data) res.send(data);
      else raiseRecord404Error(req, res);
    })
    .catch((err) => next(err));
});

router.post("/", (req, res, next) => {
  userCrud
    .create(req.body)
    .then((data) => res.status(201).json(data))
    .catch((err) => next(err));
});

router.put("/:id", validateDbId, (req, res) => {
  userCrud
    .update(req.params.id, req.body)
    .then((data) => {
      if (data) res.send(data);
      else raiseRecord404Error(req, res);
    })
    .catch((err) => next(err));
});

router.delete("/:id", validateDbId, (req, res) => {
  userCrud
    .delete(req.params.id)
    .then((data) => {
      if (data) res.send(data);
      else raiseRecord404Error(req, res);
    })
    .catch((err) => next(err));
});

router.post("/:userId/:bookId", async (req, res) => {
  try {
    const { userId, bookId } = req.params;

    // Find the user by userId

    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the book by bookId

    const book = await Books.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check if the book is already booked by the user

    if (user.books.includes(bookId)) {
      return res

        .status(400)

        .json({ message: "Book already booked by this user" });
    }

    // Book the book for the user

    user.books.push(bookId);

    await user.save();

    return res.status(200).json({ message: "Book successfully booked" });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find the user by userId

      const user = await Users.findOne({username:username});

    if (!user) {
      return res.status(404).json({ message: " No user found for this username" });
    }


    if (user.password != password) {
      return res.status(404).json({ message: "Password not correct" });
    }

    return res.status(200).json({ success:true, message: "Login successfull",User:user });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: error});
  }
});

module.exports = router;
