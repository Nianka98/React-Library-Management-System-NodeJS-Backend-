// const mongoose = require("mongoose");

// const bookSchema = new mongoose.Schema(
//   {
//     bookTitle: { type: String },
//     author: { type: String },
//     publisher: { type: String },
//     quantity: { type: Number },
//     image: { type: String },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Book = mongoose.model("Book", bookSchema);
// module.exports = Book;
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    bookTitle: { type: String },
    author: { type: String },
    publisher: { type: String },
    quantity: { type: Number },
    // Add a field to store the image path
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
