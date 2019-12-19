const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authenticate = require("../authenticate");

const TextMessages = require("../models/txtMessage");

const txtMessageRouter = express.Router();

txtMessageRouter.use(bodyParser.json());

txtMessageRouter
  .route("/")

  .all((request, response, next) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    next();
  })

  .get((request, response, next) => {
    // response.end("Will send all the Promotions to you!");
    TextMessages.find({})
      .then(
        textMsg => {
          response.statusCode = 200;
          response.setHeader("Content-Type", "application/json");
          response.json(textMsg);
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
          textMsg => {
            console.log("Text Message Created ", textMsg);

            response.statusCode = 200;
            response.setHeader("Content-Type", "application/json");
            response.json(textMsg);
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
      response.end("PUT operation not supported on /textMessage");
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

txtMessageRouter
  .route("/:TextMessageId")
  // .route("/:promoId/recipe/:recipeId")

  // .all((request, response, next) => {
  //   response.statusCode = 200;
  //   response.setHeader("Content-Type", "text/plain");
  //   next();
  // })

  .get((request, response, next) => {
    TextMessages.findById(request.params.TextMessageId)
      .then(
        textMsg => {
          console.log("Text message found by id ", textMsg);

          response.statusCode = 200;
          response.setHeader("Content-Type", "application/json");
          response.json(textMsg);
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
        "POST operation not supported on /textMessages/" +
          request.params.promotionId
      );
    }
  )

  .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    TextMessages.findByIdAndUpdate(
      req.params.promotionId,
      {
        $set: req.body
      },
      { new: true }
    )
      .then(
        textMsg => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(textMsg);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })

  .delete(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (request, response, next) => {
      TextMessages.findByIdAndRemove(request.params.txtMessageId)
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

module.exports = txtMessageRouter;
