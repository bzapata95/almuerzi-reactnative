const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

const meals = require("./routes/meals");
const orders = require("./routes/orders");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use("/api/meals", meals);
app.use("/api/orders", orders);

module.exports = app;
