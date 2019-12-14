var express = require("express");
const bodyParser = require("body-parser");
var Users = require("../models/user");
var passport = require("passport");
var authenticate = require("../authenticate");

var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get("/", authenticate.verifyUser, authenticate.verifyAdmin, function(
  req,
  res,
  next
) {
  // res.send("respond with a resource");

  // console.log(req.user);
  // if (req.user.admin) {
  //   console.log("user is an admin");
  //   Users.find({})
  //    .then(
  //       user => {
  //         res.statusCode = 200;
  //         res.setHeader("Content-Type", "application/json");
  //         res.json(user);
  //       },
  //       err => next(err)
  //     )
  //     .catch(err => next(err));
  // } else {
  //   console.log("user is NOT admin.");
  //   err = new Error(
  //     "You are not admin enough to get in here. You are not authorized to perform this operation!"
  //   );
  //   err.status = 403;
  //   return next(err);
  // }

  Users.find({})
    .then(
      user => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(user);
      },
      err => next(err)
    )
    .catch(err => next(err));
});

/* Sign up route. */

router.post("/signup", (req, res, next) => {
  Users.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ err: err });
      } else {
        if (req.body.firstname) {
          user.firstname = req.body.firstname;
        }

        if (req.body.lastname) {
          user.lastname = req.body.lastname;
        }
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.json({ err: err });
            return;
          }

          passport.authenticate("local")(req, res, () => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({
              success: true,
              status: "Registration Successful!"
            });
          });
        });
      }
    }
  );
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  var token = authenticate.getToken({ _id: req.user._id });

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({
    success: true,
    token: token,
    status: "You are Successful - logged in!!"
  });
});

/* for logging out the user */

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie("session-id");
    res.redirect("/");
  } else {
    var err = new Error("You are not logged in");
    err.status = 403;
    next(err);
  }
});

module.exports = router;
