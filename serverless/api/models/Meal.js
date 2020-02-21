const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
  name: String,
  description: String
});

module.exports = mongoose.model("Meal", MealSchema);
