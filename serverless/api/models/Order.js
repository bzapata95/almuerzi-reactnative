const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  meal_id: { type: mongoose.Schema.Types.ObjectId, ref: "Meal" },
  user_id: String
});

module.exports = mongoose.model("Order", OrderSchema);
