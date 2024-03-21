const express = require("express");
const passport = require("passport");
const withToken = passport.authenticate("bearer");
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
      req.session.user = req.user;
      res.status(200).json(user);
    } else {
      res.status(401).send();
    }
  }
);

router.get("/login", withToken, function(req, res){
  //console.log(req);
  //res.status(200).send();

  if (req.user) {
    // const user = {
    //   _id: req.user._id,
    //   firstName: req.user.firstName,
    //   lastName: req.user.lastName,
    //   email: req.user.email,
    //   userCreated: req.user.userCreated,
    //   role: req.user.role,
    //   token: generateToken({ id: req.session.passport.user.id }, 24),
    // };
    req.session.user = req.user;
    res.status(200).json(req.user);
  } else {
    res.status(401).send();
  }
});

router.get("/logout", function (req, res, next) {
  req.session.user = null;
  req.session.save(function (err) {
    if (err) next(err);
    req.session.regenerate(function (err) {
      if (err) next(err);
      res.status(200).json({ status: "Logged Out." });
    });
  });
});

module.exports = router;
