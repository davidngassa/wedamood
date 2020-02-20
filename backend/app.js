const express = require("express");
const bodyParser = require("body-parser");

const citiesRoutes = require("./routes/cities-routes");

const app = express();

app.use("/api/cities", citiesRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500).json({
    message: error.message || "Something went wrong, please try again later."
  });
});

app.listen(5000);
