const express = require("express");
const { check } = require("express-validator");

const userControllers = require("../controllers/users-controllers");

const router = express.Router();

// Sign up a new user
router.post(
  "/signup",
  [
    check("username")
      .not()
      .isEmpty(),
    check("email")
      .normalizeEmail()
      .isEmail(),
    check("password").isLength({ min: 6 })
  ],
  userControllers.signUpUser
);

// Login user
router.post("/login", userControllers.loginUser);

module.exports = router;
