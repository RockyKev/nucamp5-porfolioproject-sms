const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authenticate = require("../authenticate");
// var config = require("../config"); // to pull all the SECRETS

const TextMessages = require("../models/txtMessages");
const SendTextMessage = require("../sms");

const txtMsgRouter = express.Router();
txtMsgRouter.use(bodyParser.json());

txtMsgRouter
  .route("/")

  // .all((request, response, next) => {
  //   response.statusCode = 200;
  //   response.setHeader("Content-Type", "text/plain");
  //   next();
  // })

  .get((request, response, next) => {
    // response.end("Will send all the TextMessages to you!");
    TextMessages.find({})
      .then(
        textMessage => {
          console.log(textMessage);

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

/*********************************
 * THIS IS TO GET THE MESSAGE IDS
 *********************************/

txtMsgRouter
  .route("/:textMessageId")

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

/*********************************
 * THIS IS TO SEND THE TEXT MESSAGE
 *********************************/

/************************************
 *
 * MODIFYING THE COMMENTS ENDPOINTS
 *
 * *********************************/

txtMsgRouter
  .route("/:textMessageId/send/")

  .get((request, response, next) => {
    TextMessages.findById(request.params.textMessageId)
      .then(
        text => {
          //set up conditional

          //check to see if null
          console.log("message checking if statement");

          if (!text.wasMsgSent) {
            SendTextMessage(text.message);
            console.log(text.message);

            text.wasMsgSent = true;
            text.save();
          }

          console.log("message completed if statement");

          response.statusCode = 200;
          response.setHeader("Content-Type", "application/json");
          response.json(`${text.message} has been sent!`);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })

  .post(authenticate.verifyUser, (request, response, next) => {
    response.statusCode = 403;
    response.end(
      "POST operation not supported on /text/" +
        request.params.textMessageId +
        "/comments"
    );
  })

  .put(authenticate.verifyUser, (request, response, next) => {
    response.statusCode = 403;
    response.end(
      "PUT operation not supported on /text/" +
        request.params.textMessageId +
        "/comments"
    );
  })

  .delete(authenticate.verifyUser, (request, response, next) => {
    response.statusCode = 403;
    response.end(
      "DELETE operation not supported on /text/" +
        request.params.textMessageId +
        "/comments"
    );
  });

module.exports = txtMsgRouter;
