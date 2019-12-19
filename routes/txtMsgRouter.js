const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authenticate = require("../authenticate");

const TextMessages = require("../models/txtMessages");

const txtMsgRouter = express.Router();

txtMsgRouter.use(bodyParser.json());

txtMsgRouter
  .route("/")

  .all((request, response, next) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    next();
  })

  .get((request, response, next) => {
    // response.end("Will send all the TextMessages to you!");
    TextMessages.find({})
      .then(
        textMessage => {
          response.statusCode = 200;
          response.setHeader("Content-Type", "application/json");
          response.json(textMessage);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })

  .post(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (request, response, next) => {
      TextMessages.create(request.body)
        .then(
          textMessage => {
            console.log("textMessage Created ", textMessage);

            response.statusCode = 200;
            response.setHeader("Content-Type", "application/json");
            response.json(textMessage);
          },
          err => next(err)
        )
        .catch(err => next(err));
    }
  )

  .put(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (request, response, next) => {
      response.statusCode = 403;
      response.end("PUT operation not supported on /txtMessages");
    }
  )

  .delete(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (request, response, next) => {
      TextMessages.remove({})
        .then(
          resp => {
            response.statusCode = 200;
            response.setHeader("Content-Type", "application/json");
            response.json(resp);
          },
          err => next(err)
        )
        .catch(err => next(err));
    }
  );

txtMsgRouter
  .route("/:textMessageId")
  // .route("/:promoId/recipe/:recipeId")

  // .all((request, response, next) => {
  //   response.statusCode = 200;
  //   response.setHeader("Content-Type", "text/plain");
  //   next();
  // })

  .get((request, response, next) => {
    TextMessages.findById(request.params.textMessageId)
      .then(
        textMessage => {
          console.log("textMessage found by id ", textMessage);

          response.statusCode = 200;
          response.setHeader("Content-Type", "application/json");
          response.json(textMessage);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })

  .post(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (request, response, next) => {
      response.statusCode = 403;
      response.end(
        "POST operation not supported on /TextMessages/" +
          request.params.textMessageId
      );
    }
  )

  .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    TextMessages.findByIdAndUpdate(
      req.params.textMessageId,
      {
        $set: req.body
      },
      { new: true }
    )
      .then(
        textMessage => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(textMessage);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })

  .delete(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (request, response, next) => {
      TextMessages.findByIdAndRemove(request.params.textMessageId)
        .then(
          resp => {
            response.statusCode = 200;
            response.setHeader("Content-Type", "application/json");
            response.json(resp);
          },
          err => next(err)
        )
        .catch(err => next(err));
    }
  );

module.exports = txtMsgRouter;
