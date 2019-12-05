const express = require("express");
const bodyParser = require("body-parser");

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter
  .route("/")

  .all((request, response, next) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    next();
  })

  .get((request, response, next) => {
    response.end("Will send all the promo to you!");
  })

  .post((request, response, next) => {
    response.end(
      "Will add the promo: " +
        request.body.name +
        " with details: " +
        request.body.description
    );
  })

  .put((request, response, next) => {
    response.statusCode = 403;
    response.end("PUT operation not supported on /promo");
  })

  .delete((request, response, next) => {
    response.end("Deleting all the promo!");
  });

promoRouter
  .route("/:promoId")
  // .route("/:promoId/recipe/:recipeId")

  .all((request, response, next) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    next();
  })

  .get((request, response, next) => {
    response.end(
      "Will send details of the promo: " + request.params.promoId + " to you! "
      // + request.params.recipeId
    );
  })

  .post((request, response, next) => {
    response.end(
      "POST operation not supported on /promotions" + request.params.promoId
    );
  })

  .put((request, response, next) => {
    response.statusCode = 403;
    response.write("Updating the promos: " + request.params.promoId + "\n");
    response.end(
      "Will update the promo: " +
        request.body.name +
        " with details: " +
        request.body.description
    );
  })

  .delete((request, response, next) => {
    response.end("Deleting promo: " + request.params.promoId);
  });

module.exports = promoRouter;
