const express = require("express");

const HttpError = require("../models/http-error");

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "c1",
    apiId: "2172797",
    user: "u1"
  },
  {
    id: "c2",
    apiId: "2172797",
    user: "u2"
  },
  {
    id: "c3",
    apiId: "2172797",
    user: "u3"
  }
];

router.get("/", (req, res, next) => {
  res.json({ message: "It works" });
});

router.get("/:cid", (req, res, next) => {
  const cityId = req.params.cid;
  const city = DUMMY_PLACES.find(c => {
    return c.user === cityId;
  });

  if (!city) {
    return next(new HttpError("Could not find city for the provided id", 404));
  }

  res.json({ city });
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const city = DUMMY_PLACES.find(c => {
    return c.uid === userId;
  });

  if (!city) {
    return next(
      new HttpError("Could not find city for the provided userId", 404)
    );
  }

  res.json({ city });
});

module.exports = router;
