const uuid = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

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

const getCitiesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const userCities = DUMMY_PLACES.filter(c => {
    return c.user === userId;
  });

  if (!userCities || userCities.length === 0) {
    return next(
      new HttpError("Could not find any city for the provided userId", 404)
    );
  }

  res.json({ userCities });
};

const saveCity = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data", 422);
  }

  const { apiId, uid } = req.body;

  const savedCity = {
    id: uuid(),
    apiId,
    uid
  };

  DUMMY_PLACES.push(savedCity);

  res.status(201).json({ savedCity });
};

const deleteCityById = (req, res, next) => {
  const cityId = req.params.cid;

  if (!DUMMY_PLACES.find(c => c.id === cityId)) {
    return next(new HttpError("Could not find city for the provided id", 404));
  }

  DUMMY_PLACES = DUMMY_PLACES.filter(c => {
    return c.id !== city.id;
  });

  res.status(200).json({ message: "City deleted successfully." });
};

exports.getCitiesByUserId = getCitiesByUserId;
exports.saveCity = saveCity;
exports.deleteCityById = deleteCityById;
