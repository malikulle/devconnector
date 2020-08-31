const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

// @route GET /api/auth
// @desc Get user
// @access private
router.get("/", auth, async (req, res) => {
  try {
    const id = req.user.id;

    const user = await User.findById(id).select("-password");

    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error",
    });
  }
});

// @route POST /api/auth
// @desc Login user
// @access private
router.post(
  "/",
  [
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Please provide a password with min length 6").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    try {
      // see if user exist
      const user = await User.findOne({ email });


      if (!user) {
        return res.status(400).json({
          errors: [{ msg: "Invalid Credantial" }],
        });
      }

      // Check Password
      const isMatch = await bcrypt.compareSync(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          errors: [{ msg: "Invalid Credantial" }],
        });
      }
      // return jsonwebtoken


      const payload = {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET_KEY,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;

          return res.status(200).json({
            token: token,
            success: true,
            user: {
              _id: user._id,
              name : user.name,
              email : user.email,
              avatar : user.avatar,
              date : user.date
            },
          });
        }
      );
    } catch (error) {
      res.status(500).json({
        success: false,
        msg: "Internal Error",
      });
    }
  }
);

module.exports = router;
