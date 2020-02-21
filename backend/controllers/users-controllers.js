const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/user");

let DUMMY_USERS = [
  {
    id: "u1",
    username: "Mustard",
    email: "mustard@gmail.com",
    password: "testtest"
  }
];

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

  const newUser = new User({
    username: username,
    email: email,
    password: password,
    cities: []
  });

  try {
    await newUser.save();
  } catch (err) {
    return next(
      new HttpError("Signging up failed, please try again later", 500)
    );
  }

  res.status(200).json({ newUser: newUser.toObject({ getters: true }) });
};

const loginUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid input passed, please check your data", 422);
  }

  const { email, password } = req.body;
  let user;

  try {
    user = await User.findOne({ email: email, password: password });
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

  res.status(200).json({ message: "Logged in!" });
};

exports.signUpUser = signUpUser;
exports.loginUser = loginUser;
