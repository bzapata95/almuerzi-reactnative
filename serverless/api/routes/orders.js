const { Router } = require("express");
const routes = Router();

const { isAuthenticated, hasRole } = require("../auth");

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

routes.post("/", isAuthenticated, (req, res) => {
  const { _id } = req.user;

  Order.create({ ...req.body, user_id: _id }).then(x => res.send(x));
});

routes.put("/:id", isAuthenticated, (req, res) => {
  Order.findByIdAndUpdate(req.params.id, req.body).then(x => res.send(x));
});

routes.delete("/:id", isAuthenticated, (req, res) => {
  Order.findOneAndDelete(req.params.id)
    .exec()
    .then(() => res.send());
});

module.exports = routes;
