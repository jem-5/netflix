const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
  name: { type: String, required: true, maxLength: 50 },
});

DirectorSchema.virtual("url").get(function () {
  return `/catalog/director/${this._id}`;
});

module.exports = mongoose.model("Director", DirectorSchema);
