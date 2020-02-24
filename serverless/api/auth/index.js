const jwt = require("jsonwebtoken");

const User = require("../models/User");

export const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.sendStatus(403);

  jwt.verify(token, "mi-secreto", (err, decoded) => {
    if (err) console.log(err);

    const { _id } = decoded;

    User.findOne({ _id })
      .exec()
      .then(user => {
        req.user = user;
        next();
      });
  });
};

export const hasRole = role => (req, res, next) => {
  if (req.user.role === role) {
    return next();
  }
  res.sendStatus(403);
};

export const hasRoles = roles => (req, res, next) => {
  if (roles.indexOf(req.user.role) > -1) {
    return next();
  }
  res.sendStatus(403);
};
