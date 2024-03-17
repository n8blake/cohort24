// eslint-disable-next-line no-unused-vars
//const mongoose = require("mongoose");
const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;
const CustomStrategy = require("passport-custom").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
  },
  function verify(username, password, cb) {
    //console.log("finding user...");
    User.findOne({ email: username })
      .then((user) => {
        crypto.pbkdf2(
          password,
          user.salt,
          50000,
          32,
          "sha256",
          function (err, hashedPassword) {
            if (err) {
              return cb(err);
            }
            const userHashedPasswordBuffer = Buffer.from(
              user.hashedPassword,
              "hex"
            );
            if (
              !crypto.timingSafeEqual(userHashedPasswordBuffer, hashedPassword)
            ) {
              console.log("incorrect password");
              return cb(null, false, {
                message: "Incorrect username or password.",
              });
            } else {
              //console.log("authenticated");
            }
            return cb(null, user);
          }
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }
);

const jwtAdminStrategy = new CustomStrategy(function (request, done) {
  //console.log("Authenticating with jwt");
  if (request.headers.token) {
    try {
      const token = request.headers.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (!decoded.expirationDate || !decoded.id) {
        //response.status(403).send("Invalid auth credentials.")
        return done(null, false, { message: "Invalid auth credentials." });
      }
      const { expirationDate } = decoded;
      if (process.env.NODE_ENV === "development") console.log(expirationDate);
      const expirationDateObject = new Date(expirationDate);
      if (
        process.env.NODE_ENV !== "development" &&
        expirationDateObject < new Date()
      ) {
        //res.status(403).send("Token has expired.")
        console.log("Expired token");
        return done(null, false, { message: "Token has expired." });
      }
      //console.log(`Finding user: ${decoded.id}`);
      User.findOne({ _id: decoded.id })
        .then((user) => {
          //console.log(user);
          if (!user || user.role !== "admin") {
            console.log("Invalid user role");
            return done(null, false, {message: "User does not have proper role"});
          } else {
            console.log("user access granted");
            return done(null, user);
          }
        })
        .catch((error) => {
          console.error(error);
          return done(null, false);
        });
    } catch (error) {
      console.error(error);
      return done(null, false);
    }
  } else {
    console.log("no token provided in header");
    return done(null, false);
  }
});

const bearerStrategy = new BearerStrategy(function(token, done){
  //console.log("Authenticating http-bearer");
  if (token) {
    try {
      //console.log(token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      //console.log(decoded);
      if (!decoded.expirationDate || !decoded.data.id) {
        //console.log("Invalid auth credentials.");
        return done(null, false, { message: "Invalid auth credentials." });
      }
      const { expirationDate } = decoded;
      if (process.env.NODE_ENV === "development"){
        console.log(`Login expiration date: ${expirationDate}`);
      }
      const expirationDateObject = new Date(expirationDate);
      if (
        process.env.NODE_ENV !== "development" &&
          expirationDateObject < new Date()
      ) {
        //res.status(403).send("Token has expired.")
        //console.log("Expired token");
        return done(null, false, { message: "Token has expired." });
      }
      //console.log(`Finding user: ${decoded.data.id}`);
      User.findOne({ _id: decoded.data.id })
        .then((user) => {
          //console.log(user);
          if (!user || user.role !== "admin") {
            //console.log("Invalid user role");
            return done(null, false, {
              message: "User does not have proper role",
            });
          } else {
            //console.log("user access granted");
            return done(null, user, { scope: "all"});
          }
        })
        .catch((error) => {
          console.error(error);
          return done(null, false);
        });
    } catch (error) {
      console.error(error);
      return done(null, false);
    }
  } else {
    console.log("no token provided");
    return done(null, false);
  }
});

const configure = function (passport) {
  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      cb(null, { id: user.id, username: user.username });
    });
  });

  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });

  passport.use("local", localStrategy);
  passport.use("jwtAdmin", jwtAdminStrategy);
  passport.use("bearer", bearerStrategy);
};

module.exports = configure;
