const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const City = require("../models/city");
const User = require("../models/user");

let DUMMY_PLACES = [
  {
    id: "c1",
    apiId: "2172797",
    user: "u1"
  },
  {
    id: "c2",
    apiId: "1850147",
    user: "u2"
  },
  {
    id: "c3",
    apiId: "2172797",
    user: "u3"
  }
];

const getCitiesByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let userCities;

  try {
    userCities = await City.find({ user: userId });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find any city for this user",
      500
    );
    return next(error);
  }

  if (!userCities || userCities.length === 0) {
    return next(
      new HttpError("Could not find any city for the provided userId", 404)
    );
  }

  res.json({
    userCities: userCities.map(city => city.toObject({ getters: true }))
  });
};

const saveCity = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data", 422);
  }

  const { apiId, user } = req.body;

  // Checking if user exists
  let existingUser;

  try {
    existingUser = await User.findById(user);
  } catch (err) {
    return next(new HttpError("Saving city failed , please try again", 500));
  }

  if (!existingUser) {
    return next(
      new HttpError("Could not find any user for the provided id", 404)
    );
  }

  // Checking if city had already been saved by user
  let existingCity;

  try {
    existingCity = await City.findOne({ apiId: apiId, user: user });
  } catch (err) {
    return next(new HttpError("Saving city failed , please try again", 500));
  }

  if (existingCity) {
    return next(
      new HttpError("This city exists already in user's library", 402)
    );
  }

  // If everything okay goes on to save city
  const newCity = new City({
    apiId: apiId,
    user: user
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();

    await newCity.save({ session: sess });
    existingUser.cities.push(newCity);
    await existingUser.save({ session: sess });

    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Saving city failed, please try again", 500);
    return next(error);
  }

  res.status(201).json({ newCity });
};

const deleteCityById = async (req, res, next) => {
  const cityId = req.params.cid;
  let city;

  try {
    city = await City.findById(cityId).populate("user");
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not delete city", 500)
    );
  }

  if (!city) {
    return next(new HttpError("Could not find city for the provided id", 404));
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();

    await city.remove({ session: sess });
    city.user.cities.pull(city);
    await city.user.save();

    await sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not delete city", 500)
    );
  }

  res.status(200).json({ message: "City deleted successfully." });
};

exports.getCitiesByUserId = getCitiesByUserId;
exports.saveCity = saveCity;
exports.deleteCityById = deleteCityById;
