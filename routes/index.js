var express = require("express");
var router = express.Router();
var path = require("path");

/* GET home page. */
router.get("/", function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // res.sendFile(__dirname + "../public/index.html");
  res.sendFile(path.resolve(__dirname, "../public"));
});

module.exports = router;
