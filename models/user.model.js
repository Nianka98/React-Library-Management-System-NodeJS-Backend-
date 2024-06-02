const mongoose = require("mongoose");

module.exports = mongoose.model("Users", {
  username: { type: String },
  password: { type: String },
  roles: { type: Number },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
});
// const mongoose = require("mongoose");

// module.exports = mongoose.model("Users", {
//   username: { type: String },
//   password: { type: String },
//   roles: { type: Number },
//   books: [{ type: mongoose.Schema.Types.ObjectId, ref: "BookCheckIn" }], // Update the reference to 'BookCheckIn'
// });
