const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const citySchema = new Schema({
  apiId: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, required: true, ref: "User" }
});

module.exports = mongoose.model("City", citySchema);
