var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");
var session = require("express-session");

// var passport = require("passport");
// var OidcStrategy = require("passport-openidconnect").Strategy;
var okta = require("@okta/okta-sdk-nodejs");
var ExpressOIDC = require("@okta/oidc-middleware").ExpressOIDC;

var config = require("./config");

var indexRouter = require("./routes/index");
var makeRouter = require("./routes/make");
var usersRouter = require("./routes/users");
var txtMsgRouter = require("./routes/txtMsgRouter");

const mongoose = require("mongoose");

const url = config.mongoUrl;
const connect = mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

connect.then(
  db => {
    console.log("Connected correctly to server!");
  },
  err => {
    console.log(err);
  }
);

var app = express();

//setting up Okta and the OpenAuth
var oktaClient = new okta.Client({
  orgUrl: config.okta.url,
  token: config.okta.token
});

const oidc = new ExpressOIDC({
  issuer: config.okta.url + "/oauth2/default",
  client_id: config.okta.id,
  client_secret: config.okta.secret,
  redirect_uri: "http://localhost:3000/users/callback",
  scope: "openid profile",
  routes: {
    login: {
      path: "/users/login"
    },
    callback: {
      path: "/users/callback",
      defaultRedirect: "/dashboard"
    }
  }
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser("12345-67890-54321"));

app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    // secret: "SLKDFJDASKJFDSJFdlkfjslfj12123jdflsjlSJFLKSFJ",
    secret: config.appsessionsecret,
    resave: true,
    saveUninitialized: false
  })
);
app.use(oidc.router);

//Okta - checking for login
app.use((req, res, next) => {
  if (!req.userinfo) {
    return next();
  }

  oktaClient
    .getUser(req.userinfo.sub)
    .then(user => {
      req.user = user;
      res.locals.user = user;
      next();
    })
    .catch(err => {
      next(err);
    });
});

//The routes -- finally!
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/texts", txtMsgRouter);
app.use("/make", loginRequired, makeRouter);
app.use("/login", passport.authenticate("oidc"));

//test route
app.get("/test", (req, res) => {
  res.json({ profile: req.user ? req.user.profile : null });
});

function loginRequired(req, res, next) {
  if (!req.user) {
    return res.status(401).render("unauthenticated");
  }

  next();
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
