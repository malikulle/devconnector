const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");

//@route GET api/profile/me
//@desc Get Current User Profile
//@access Private
router.get("/me", auth, async (req, res) => {
  try {
    const id = req.user.id;
    const profile = await Profile.findOne({ user: id }).populate("user", [
      "name",
      "avatar",
    ]);
    if (!profile) {
      return res.status(400).json({
        msg: "There is no profile for this user",
      });
    }

    res.status(200).json({
       profile,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

//@route POST api/profile
//@desc Create or Update Profile
//@access Private
router.post(
  "/",
  [
    auth,
    check("status", "Status is requreid").not().isEmpty(),
    check("skills", "Skills is requreid").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const {
      company,
      location,
      website,
      bio,
      skills,
      status,
      githubusername,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
    } = req.body;

    const profileFields = {};

    profileFields.user = req.user.id;

    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;

    if (skills) {
      profileFields.skills = skills.split(",").map((item) => item.trim());
    }

    profileFields.social = {};

    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.status(200).json({
          profile,
        });
      }

      profile = new Profile(profileFields);

      await profile.save();

      res.status(200).json({
        profile,
      });
    } catch (error) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route GET api/profile
//@desc Get all profiles
//@access Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find({}).populate("user", [
      "name",
      "avatar",
    ]);
    res.status(200).json({
      profiles,
    });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

//@route GET api/profile/user/:userId
//@desc Get User Profile
//@access Public
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const profile = await Profile.findOne({ user: userId }).populate("user", [
      "name",
      "avatar",
    ]);
    if (!profile) {
      return res.status(200).json({
        msg: "There is no profile for this user",
      });
    }

    res.status(200).json({
      profile,
    });
  } catch (error) {
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Profile Not Found" });
    }
    res.status(500).send("Server Error");
  }
});

//@route DELETE api/profile
//@desc Delete Profile ,user & posts
//@access Private
router.delete("/", auth, async (req, res) => {
  try {
    const id = req.user.id;
    // Remove Profile
    await Profile.findOneAndRemove({ user: id });
    //Remove User
    await User.findOneAndRemove({ _id: id });
    res.status(200).json({
      msg: "User Removed",
    });
  } catch (error) {}
});

//@route Put api/profile/exprience
//@desc Add Profile Exprience
//@access Private
router.put(
  "/experience",
  [
    auth,
    check("title", "Title is required").not().isEmpty(),
    check("company", "Company is required").not().isEmpty(),
    check("from", "From date is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);

      await profile.save();

      res.status(200).json({
        profile: profile,
      });
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }
);

router.delete("/experience/:experienceId", auth, async (req, res) => {
  const { experienceId } = req.params;

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(400).json({
        msg: "Profile Not Found",
      });
    }

    const removeIndex = profile.experience.findIndex(
      (item) => item._id === experienceId
    );

    profile.experience = profile.experience.splice(removeIndex, 1);

    await profile.save();

    return res.status(200).json({
      profile: profile,
    });
  } catch (error) {}
});

// @route POST /api/profile/education
// @desc Create Education
// @access private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required").not().isEmpty(),
      check("degree", "Degree is required").not().isEmpty(),
      check("fieldofstudy", "Field of study is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEducation = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (!profile) {
        return res.status(400).json({
          msg: "Profile Not Found",
        });
      }

      profile.education.push(newEducation);
      await profile.save();

      return res.status(200).json({
        profile: profile,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route DELETE /api/profile/education/:edcucationId
// @desc Delete Education
// @access private
router.delete("/education/:educationId", auth, async (req, res) => {
  const { educationId } = req.params;

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(400).json({
        msg: "Profile Not Found",
      });
    }

    const educationIndex = profile.education.findIndex(
      (x) => x._id === educationId
    );

    profile.education.splice(educationIndex, 1);

    await profile.save();

    return res.status(200).json({
      profile: profile,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
