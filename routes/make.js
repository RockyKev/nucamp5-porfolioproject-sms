var express = require("express");
const bodyParser = require("body-parser");
var passport = require("passport");
var authenticate = require("../authenticate");

var router = express.Router();

/* GET home page. */
// router.get("/", authenticate.verifyUser, function(req, res, next) {
// router.get("/", function(req, res, next) {
//   res.render("make", { title: "Make Test" });
// });

/* GET home page. */
router.get("/", function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // res.sendFile(__dirname + "../public/index.html");
  res.sendFile(path.resolve(__dirname, "../public/make.html"));
});

module.exports = router;
