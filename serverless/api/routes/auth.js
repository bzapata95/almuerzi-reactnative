const { Router } = require("express");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const { isAuthenticated } = require("../auth");

const routes = Router();

const User = require("../models/User");

const signToken = _id => {
  return jwt.sign({ _id }, "mi-secreto", { expiresIn: 84600 });
};

routes.post("/register", (req, res) => {
  const { email, password } = req.body;
  crypto.randomBytes(16, (err, salt) => {
    const newSalt = salt.toString("base64");
    crypto.pbkdf2(password, newSalt, 10000, 64, "sha1", (err, key) => {
      const encryptedPassword = key.toString("base64");

      User.findOne({ email })
        .exec()
        .then(user => {
          if (user) return res.send({ message: "Usuario ya existe" });

          User.create({
            email,
            password: encryptedPassword,
            salt: newSalt
          }).then(() => {
            res.send({ message: "Usuario creado con éxito" });
          });
        });
    });
  });
});

routes.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .exec()
    .then(user => {
      if (!user)
        return res.send({ message: "Usuario y/o contraseña incorrecta" });

      crypto.pbkdf2(password, user.salt, 10000, 64, "sha1", (err, key) => {
        const encryptedPassword = key.toString("base64");
        if (user.password === encryptedPassword) {
          const token = signToken(user._id);
          return res.send({ token });
        }
        return res.send({ message: "Usuario y/o contraseña incorrecta" });
      });
    });
});

routes.get("/me", isAuthenticated, (req, res) => {
  return res.send(req.user);
});
module.exports = routes;
