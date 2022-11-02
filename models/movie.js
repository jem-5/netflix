const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title: { type: String, required: false },
  director: { type: Schema.ObjectId, ref: "Director", required: false },
  summary: { type: String, required: false },
  category: [{ type: Schema.ObjectId, ref: "Category" }],
  year: { type: Number, required: false },
  price: { type: Number, required: false },
  stock: { type: Number, required: false },
});

MovieSchema.virtual("url").get(function () {
  return `/catalog/movie/${this._id}`;
});

module.exports = mongoose.model("Movie", MovieSchema);
