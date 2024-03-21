const router = require("express").Router();
const passport = require("passport");
const withToken = passport.authenticate("bearer");
// require routes files
const usersRoutes = require("./users");
const authRoutes = require("./auth");
const weatherRoutes = require("./weather");
const locationRoutes = require("./location");
const coursesRoutes = require("./courses");

// use routes
router.use("/auth", authRoutes);
router.use("/courses", withToken, coursesRoutes);
router.use("/users", usersRoutes);
router.use("/weather", weatherRoutes);
router.use("/location", locationRoutes);

// export
module.exports = router;
