// prettier-ignore

const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
  // To ensure the option request is not blocked
  if (req.method === "OPTIONS") {
    return next();
  }

  // Checking for token
  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization : 'Bearer TOKEN'
    if (!token) {
      throw new Error("Authentication failed!");
    }

    const decodedToken = jwt.verify(token, "its_a_cold_world_out_there");
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    return next(new HttpError("Authentication failed!", 403));
  }
};
