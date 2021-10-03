const mongoose = require("mongoose");

const model = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
  },
});

module.exports = new mongoose.model("User", model, "users");
