const express = require("express");

const userControllers = require("../controllers/users-controllers");

const router = express.Router();

router.post("/signup", userControllers.signUpUser);

router.post("/login", userControllers.loginUser);

module.exports = router;
