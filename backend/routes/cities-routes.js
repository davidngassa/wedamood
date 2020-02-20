const express = require("express");

const citiesControllers = require("../controllers/cities-controllers");

const router = express.Router();

router.get("/user/:uid", citiesControllers.getCitiesByUserId);

router.post("/", citiesControllers.saveCity);

router.delete("/:cid", citiesControllers.deleteCityById);

module.exports = router;
