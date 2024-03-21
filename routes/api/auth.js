const express = require("express");
const passport = require("passport");
const generateUserToken = require("../../utils/TokenGenerator");
// const crypto = require("crypto");
// const User = require("../../models/User");
const router = express.Router();

router.post(
  "/login/password",
  passport.authenticate("local"),
  function (req, res) {
    console.log("getting user");
    if (req.user) {
      const user = {
        _id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        userCreated: req.user.userCreated,
        role: req.user.role,
        token: generateUserToken(req.user._id)
      };
      req.session.userId = req.user._id;
      res.status(200).json(user);
    } else {
      res.status(401).send();
    }
  }
);

router.get("/login", passport.authenticate("bearer"), function(req, res){
  //console.log("Authenticating user");
  if (req.user) {
    const user = {
      _id: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      userCreated: req.user.userCreated,
      role: req.user.role,
      token: generateToken({ id: req.session.passport.user.id }, 24),
    };
    req.session.userId = req.user._id;
    res.status(200).json(user);
  } else {
    res.status(401).send();
  }
});

router.get("/logout", function (req, res, next) {
  req.session.userId = null;
  req.session.save(function (err) {
    if (err) next(err);
    req.session.regenerate(function (err) {
      if (err) next(err);
      res.status(200).json({ status: "Logged Out." });
    });
  });
});

module.exports = router;
