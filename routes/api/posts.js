const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");
const User = require("../../models/User");

// @route POST /api/posts
// @desc Create Post
// @access private
router.post(
  "/",
  auth,
  [check("text", "Text is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      const post = await Post.create(newPost);

      res.status(200).json({
        post,
      });
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }
);

// @route GET /api/posts
// @desc Get All Post
// @access private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    return res.status(200).json({
      posts: posts,
    });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// @route GET /api/posts
// @desc Get Post By Id
// @access private
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(400).json({
        msg: "Post Not Found",
      });
    }

    res.status(200).json({
      post: post,
    });
  } catch (error) {
    if (error.message === "ObjectId") {
      return res.status(404).json({ msg: "Object Id Error" });
    }
    res.status(500).send("Server Error");
  }
});

// @route GET /api/posts
// @desc Get Post By Id
// @access private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(400).json({
        msg: "Post Not Found",
      });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "You can not delete another post" });
    }

    await post.remove();

    res.status(200).json({
      msg: "Post Removed",
    });
  } catch (error) {}
});

// @route PUT /api/posts/like/:id
// @desc Like a Post
// @access private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({
        msg: "Post Not Found",
      });
    }

    if (
      post.likes.filter((x) => x.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({
        msg: "You already have liked",
      });
    }

    post.likes.push({ user: req.user.id });

    await post.save();

    return res.status(200).json({
      msg: "Liked Post",
      likes: post.likes,
    });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// @route PUT /api/posts/unlike/:id
// @desc UnLike a Post
// @access private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({
        msg: "Post Not Found",
      });
    }

    if (
      post.likes.filter((x) => x.user.toString() === req.user.id).length === 0
    ) {
      return res.status(400).json({
        msg: "You already have not liked post",
      });
    }

    const index = post.likes.findIndex(
      (x) => x.user.toString() === req.user.id
    );

    post.likes.splice(index, 1);

    await post.save();

    return res.status(200).json({
      msg: "UnLiked Post",
      likes: post.likes,
    });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// @route PUT /api/posts/comment/:id
// @desc Create Comment on a post
// @access private
router.post(
  "/comment/:id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(400).json({
          msg: "Post Not Found",
        });
      }

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.push(newComment);

      await post.save();

      return res.status(200).json({
        msg: "Comment Added",
        comments: post.comments,
      });
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }
);

// @route Delete /api/posts/comment/:id/:commentId
// @desc Create Comment on a post
// @access private
router.delete("/comment/:id/:commentId", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({
        msg: "Post Not Found",
      });
    }
    const comment = post.comments.find((x) => x._id.toString() === req.params.commentId);

    if (!comment) {
      return res.status(400).json({
        msg: "Comment Not Found",
      });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(400).json({
        msg: "You can not delete another post",
      });
    }

    const index = post.comments.findIndex(
      (x) => x._id === req.params.commentId
    );

    post.comments.splice(index, 1);

    await post.save();

    return res.status(200).json({
      msg: "Comment Removed",
      comments: post.comments,
    });
  } catch (error) {
      console.log(error.message)
    res.status(500).send("Server Error");
  }
});

module.exports = router;
