const express = require("express");
const { check } = require("express-validator");

const citiesControllers = require("../controllers/cities-controllers");

const router = express.Router();

// Get cities saved by user corresponding to the provided user id
router.get("/user/:uid", citiesControllers.getCitiesByUserId);

// Add new city saved by a user
router.post(
  "/",
  [
    check("apiId")
      .not()
      .isEmpty(),
    check("user")
      .not()
      .isEmpty()
  ],
  citiesControllers.saveCity
);

// Remove city from user cityList
router.delete("/:cid", citiesControllers.deleteCityById);

module.exports = router;
