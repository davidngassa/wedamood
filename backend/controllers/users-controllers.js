const uuid = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

let DUMMY_USERS = [
  {
    id: "u1",
    username: "Mustard",
    email: "mustard@gmail.com",
    password: "testtest"
  }
];

const signUpUser = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid input passed, please check your data", 422);
  }

  const { username, email, password } = req.body;

  const existingUser = DUMMY_USERS.find(u => u.email === email);

  if (existingUser) {
    throw new HttpError("Email already exists", 422);
  }

  const newUser = {
    id: uuid(),
    username,
    email,
    password
  };

  DUMMY_USERS.push(newUser);

  res.status(200).json({ newUser });
};

const loginUser = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid input passed, please check your data", 422);
  }

  const { email, password } = req.body;

  const user = DUMMY_USERS.find(u => {
    return u.email === email && u.password === password;
  });

  if (!user) {
    return next(
      new HttpError("Could not find a user for this credentials", 404)
    );
  }

  res.status(200).json({ user });
};

exports.signUpUser = signUpUser;
exports.loginUser = loginUser;
