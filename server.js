require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const compression = require("compression");
const mongoose = require("mongoose");
const MongoDBStore = require("connect-mongodb-session")(session);
const passport = require("passport");
const path = require("path");

const routes = require("./routes");

const PORT = process.env.PORT || 3001;
const app = express();

// Define Session Store
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI || "mongodb://localhost:27017/cohort24",
  collection: "sessions",
});

// Catch errors
store.on("error", function (error) {
  console.log(error);
});

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(compression());

// Use session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);

//Add passport for authentication
app.use(passport.initialize());
app.use(passport.session());

// define strategy and use it
const configurePassport = require("./middleware/passportConf");
configurePassport(passport);

// Connect to the Mongo DB
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/cohort24")
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

// Add routes, both API and view
app.use(routes);

// Serve up static assets
app.use(express.static(__dirname + "/static"));
app.get("/static/preview/", function (request, response) {
  response.sendFile(path.join(__dirname + "/static/og-thumb.png"));
});

// If no API routes are hit, send the front end app
if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/client/dist/"));
  app.get("/*", function (request, response) {
    response.sendFile(path.join(__dirname + "/client/dist/index.html"));
  });
} else {
  const proxy = require("express-http-proxy");
  app.use("/", proxy("localhost:4200"));
}

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
