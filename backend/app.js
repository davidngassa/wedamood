const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const citiesRoutes = require("./routes/cities-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

// Routes
app.use("/api/cities", citiesRoutes);
app.use("/api/users", usersRoutes);

// Invalid route handler
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

// Error handler
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500).json({
    message: error.message || "Something went wrong, please try again later."
  });
});

// Establish connection to mongo db
mongoose
  .connect(
    "mongodb+srv://david:letmeinplease@maincluster-jxgcs.mongodb.net/wedamood?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => app.listen(5000))
  .catch(err => console.log(err));
