const { Router } = require("express");
const routes = Router();

const Meal = require("../models/Meal");

routes.get("/", (req, res) => {
  Meal.find()
    .exec()
    .then(x => res.send(x));
});

routes.get("/:id", (req, res) => {
  Meal.findById(req.params.id)
    .exec()
    .then(x => res.send(x));
});

routes.post("/", (req, res) => {
  Meal.create(req.body).then(x => res.send(x));
});

routes.put("/:id", (req, res) => {
  Meal.findByIdAndUpdate(req.params.id, req.body).then(x => res.send(x));
});

routes.delete("/:id", (req, res) => {
  Meal.findOneAndDelete(req.params.id)
    .exec()
    .then(() => res.send());
});

module.exports = routes;
