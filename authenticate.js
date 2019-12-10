var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("./models/user");

exports.local = passport.use(new LocalStrategy(User.authenticate()));

//this is using passport-local-mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
