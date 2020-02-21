const { Router } = require("express");
const routes = Router();

const Order = require("../models/Order");

routes.get("/", (req, res) => {
  Order.find()
    .exec()
    .then(x => res.send(x));
});

routes.get("/:id", (req, res) => {
  Order.findById(req.params.id)
    .exec()
    .then(x => res.send(x));
});

routes.post("/", (req, res) => {
  Order.create(req.body).then(x => res.send(x));
});

routes.put("/:id", (req, res) => {
  Order.findByIdAndUpdate(req.params.id, req.body).then(x => res.send(x));
});

routes.delete("/:id", (req, res) => {
  Order.findOneAndDelete(req.params.id)
    .exec()
    .then(() => res.send());
});

module.exports = routes;
