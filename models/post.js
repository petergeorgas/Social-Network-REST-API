const mongoose = require("mongoose");

const model = mongoose.Schema({
  posterId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

module.exports = new mongoose.model("Post", model, "posts");
