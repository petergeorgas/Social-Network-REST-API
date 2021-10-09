const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const token_secret = process.env.TOKEN_SECRET;

// Logging in
router.post("/login", (request, response) => {
  User.findOne({ email: request.body.email })
    .then((user) => {
      if (!user) {
        response.status(404).json({ error: "No user found" });
      } else {
        bcrypt.compare(request.body.pass, user.pass, (err, match) => {
          if (err) {
            response.status(500).json(err);
          } else if (match) {
            response.status(200).json({ token: generateToken(user) });
          } else {
            response.status(403).json({ error: "Passwords do not match" });
          }
        });
      }
    })
    .catch((error) => {
      response.status(500).json(error);
    });
});

router.post("/register", (request, response) => {
  const { firstName, lastName, address, city, state, zipCode, email, pass } =
    request.body; // Get the body

  // Hash the password
  bcrypt.hash(pass, 10, (err, hash) => {
    if (err) {
      response.status(500).json(error);
    } else {
      // Create a new user matching our mongodb schema
      const newUser = User({
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        state: state,
        zipCode: zipCode,
        email: email,
        pass: hash,
        dateCreated: Date.now(),
      });
      newUser
        .save()
        .then((user) => {
          response
            .status(200)
            .json({ success: 1, user: user, token: generateToken(user) });
        })
        .catch((error) => {
          response.status(500).json(error);
        });
    }
  });
});

// Generate a token
function generateToken(user) {
  return jwt.sign({ data: user }, token_secret, { expiresIn: "24h" }); // Sign a certificate using our secret token that expires in 1 day...
}

module.exports = router;
