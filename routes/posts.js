const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const middleware = require("../middleware");

router.use(middleware.verify);

router.post("/posts", (request, response) => {
  const { posterId, content } = request.body;
  // Before we do anything else, we should probably verify JWT

  const newPost = Post({
    posterId: posterId,
    date: Date.now(),
    content: content,
  });

  newPost
    .save()
    .then((post) => {
      response.status(200).json({ success: 1, timePosted: newPost.date });
    })
    .catch((err) => {
      response.status(500).json(err);
    });
});

router.get("/posts/:id", (request, response) => {});

module.exports = router;
