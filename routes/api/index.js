const router = require("express").Router();
const passport = require("passport");
const withAdminRole = passport.authenticate("bearer");
// require routes files
const usersRoutes = require("./users");
const protectedUserRoutes = require("./protectedUserRoutes");
const authRoutes = require("./auth");
const weatherRoutes = require("./weather");
const locationRoutes = require("./location");

// use routes
router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/weather", weatherRoutes);
router.use("/location", locationRoutes);

// protected routes
router.use("/getUsers", withAdminRole, protectedUserRoutes);

// export
module.exports = router;
