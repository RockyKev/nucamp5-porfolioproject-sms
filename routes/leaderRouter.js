const express = require("express");
const bodyParser = require("body-parser");

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter
  .route("/")

  .all((request, response, next) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    next();
  })

  .get((request, response, next) => {
    response.end("Will send all the leaders to you!");
  })

  .post((request, response, next) => {
    response.end(
      "Will add the leader: " +
        request.body.name +
        " with details: " +
        request.body.description
    );
  })

  .put((request, response, next) => {
    response.statusCode = 403;
    response.end("PUT operation not supported on /leader");
  })

  .delete((request, response, next) => {
    response.end("Deleting all the leader!");
  });

leaderRouter
  .route("/:leaderId")
  // .route("/:leaderId/recipe/:recipeId")

  .all((request, response, next) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    next();
  })

  .get((request, response, next) => {
    response.end(
      "Will send details of the leader: " +
        request.params.leaderId +
        " to you! "
      // + request.params.recipeId
    );
  })

  .post((request, response, next) => {
    response.end(
      "POST operation not supported on /leaders" + request.params.leaderId
    );
  })

  .put((request, response, next) => {
    response.statusCode = 403;
    response.write("Updating the leader: " + request.params.leaderId + "\n");
    response.end(
      "Will update the leaders: " +
        request.body.name +
        " with details: " +
        request.body.description
    );
  })

  .delete((request, response, next) => {
    response.end("Deleting leaders: " + request.params.leaderId);
  });

module.exports = leaderRouter;
