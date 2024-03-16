const router = require("express").Router();
const apiRoutes = require("./api");
const devRoutes = require("./dev");

// API Routes
router.use("/api", apiRoutes);

if (process.env.NODE_ENV === "development"){
  router.use("/dev", devRoutes);
}

module.exports = router;
