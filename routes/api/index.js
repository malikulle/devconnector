const express = require("express");
const user = require("./users");
const auth = require("./auth");
const profile  = require("./profile");
const post  = require("./posts");
const router = express.Router();

//
router.use("/users", user);
router.use("/auth", auth);
router.use("/profile", profile);
router.use("/posts", post);
//

module.exports = router;
