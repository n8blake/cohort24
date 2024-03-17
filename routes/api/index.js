const router = require("express").Router();
const passport = require("passport");
const withAdminRole = passport.authenticate("bearer");
// require routes files
const usersRoutes = require("./users");
const protectedUserRoutes = require("./protectedUserRoutes");
const authRoutes = require("./auth");
const weatherRoutes = require("./weather");
//const horoscopeRoutes = require("./horoscope");
const locationRoutes = require("./location");

// use routes
router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/weather", weatherRoutes);
router.use("/location", locationRoutes);
//router.use("/horoscope", horoscopeRoutes);

// protected routes
router.use("/getUsers", withAdminRole, protectedUserRoutes);

// export
module.exports = router;
