const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const User = require("../models/user");

const signUpUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid input passed, please check your data", 422);
  }

  const { username, email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signging up failed, please try again later",
      500
    );
    return next(error);
  }

  if (existingUser) {
    return next(
      new HttpError("User exists already, please login instead", 422)
    );
  }

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new HttpError("Could not create user, please try again.", 500));
  }

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    cities: []
  });

  try {
    await newUser.save();
  } catch (err) {
    return next(
      new HttpError("Signging up failed, please try again later", 500)
    );
  }

  let token;

  try {
    token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      "its_a_cold_world_out_there",
      { expiresIn: "1h" }
    );
  } catch (err) {
    return next(
      new HttpError("Signging up failed, please try again later", 500)
    );
  }

  res
    .status(200)
    .json({ userId: newUser.id, email: newUser.email, token: token });
};

const loginUser = async (req, res, next) => {
  const errors = validationResult(req);

  // Check if request parameters are okay
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid input passed, please check your data", 422);
  }

  const { email, password } = req.body;
  let user;

  // Checks if email exists
  try {
    user = await User.findOne({ email: email });
  } catch (err) {
    return next(
      new HttpError("Logging in failed, please try again later", 500)
    );
  }

  if (!user) {
    return next(
      new HttpError("Could not find a user for this credentials", 404)
    );
  }

  let isValidPassword;

  // Checks if password corresponds
  try {
    isValidPassword = await bcrypt.compare(password, user.password);
  } catch (err) {
    return next(
      new HttpError("Could not log you in, please check credentials.", 500)
    );
  }

  if (!isValidPassword) {
    return next(
      new HttpError("Invalid credentials, could not log you in.", 401)
    );
  }

  let token;

  try {
    token = jwt.sign(
      { userId: user.id, email: user.email },
      "its_a_cold_world_out_there",
      { expiresIn: "1h" }
    );
  } catch (err) {
    return next(
      new HttpError("Logging in failed, please try again later", 500)
    );
  }

  res.status(200).json({ userId: user.id, email: user.email, token: token });
};

exports.signUpUser = signUpUser;
exports.loginUser = loginUser;
