const express = require("express"); // Add express
const mongoose = require("mongoose"); // Import mongoose for model stuff
const middleware = require("./middleware");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const cors = require("cors");
const { logExceptOnTest } = require("./util/util");

const CONNECTION_URL = process.env.CONNECTION_STRING;
const DB_NAME = process.env.DB_NAME;
const PORT = process.env.PORT || 3000;

const app = express(); // Init express.js

// Add headers before the routes are defined
app.use(cors());
app.use(express.json()); // Apply json middleware
app.use("/api/auth", authRoute);
app.use("/api", postRoute);

app.listen(PORT, () => {
  mongoose.connect(
    CONNECTION_URL,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    (error, client) => {
      if (error) {
        throw error;
      }
      database = mongoose.connection;
      user_collection = database.collection("users");
      ent_collection = database.collection("posts");

      logExceptOnTest(`Connected to ${DB_NAME}! API Running on port ${PORT}.`);

      if (user_collection) {
        logExceptOnTest(`Found collection users!`);
      }
      if (ent_collection) {
        logExceptOnTest(`Found collection posts!`);
      }
    }
  );
});

module.exports = app;
