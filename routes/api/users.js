const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

// @route POST /api/users
// @desc Register user
// @access Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Please provide a password with min length 6").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password, name } = req.body;

    try {
      // see if user exist
      const isExist = await User.findOne({ email });

      if (isExist) {
        return res.status(400).json({
          errors: [{ msg: "User Already Exist" }],
        });
      }
      // get users avatar

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      let user = new User({
        name,
        email,
        avatar,
        password,
      });

      // encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      user.save();
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

          return res.json({
            token: token,
            success: true,
            msg: "User Registered",
            user: {
              _id: user._id,
              name,
              email,
              name,
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
