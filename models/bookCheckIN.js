// const mongoose = require("mongoose");

// const bookSchema = new mongoose.Schema(
//   {
//     bookTitle: { type: String },
//     author: { type: String },
//     publisher: { type: String },
//     quantity: { type: Number },
//   },
//   {
//     timestamps: true,
//   }
// );

// const BookCheckIn = mongoose.model("BookCheckIn", bookSchema);
// module.exports = BookCheckIn;
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    userId: { type: String },
    bookId: { type: String },
    bookTitle: { type: String },
    author: { type: String },
    publisher: { type: String },
    quantity: { type: Number },
    username: { type: String }, // Add username field to the book schema
  },
  {
    timestamps: true,
  }
);

const BookCheckIn = mongoose.model("BookCheckIn", bookSchema);
module.exports = BookCheckIn;
