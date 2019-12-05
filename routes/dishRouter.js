const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Dishes = require("../models/dishes");

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter
  .route("/")

  .get((request, response, next) => {
    // response.end("Will send all the dishes to you!");

    Dishes.find({})
      .then(
        dishes => {
          response.statusCode = 200;
          response.setHeader("Content-Type", "application/json");
          response.json(dishes);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })

  .post((request, response, next) => {
    // response.end(
    //   "Will add the dish: " +
    //     request.body.name +
    //     " with details: " +
    //     request.body.description

    Dishes.create(request.body)
      .then(
        dish => {
          console.log("Dish Created ", dish);

          response.statusCode = 200;
          response.setHeader("Content-Type", "application/json");
          response.json(dish);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })

  .put((request, response, next) => {
    response.statusCode = 403;
    response.end("PUT operation not supported on /DISHES");
  })

  .delete((request, response, next) => {
    // response.end("Deleting all the dishes!");

    Dishes.remove({})
      .then(
        resp => {
          response.statusCode = 200;
          response.setHeader("Content-Type", "application/json");
          response.json(resp);
        },
        err => next(err)
      )
      .catch(err => next(err));
  });

////// This is for Dish ID
// .route("/:dishId/recipe/:recipeId")
dishRouter
  .route("/:dishId")

  .get((request, response, next) => {
    // "Will send details of the dish: " + request.params.dishId + " to you! "
    // + request.params.recipeId

    Dishes.findById(request.params.dishId)
      .then(
        dish => {
          console.log("Dish found by id ", dish);

          response.statusCode = 200;
          response.setHeader("Content-Type", "application/json");
          response.json(dish);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .post((request, response, next) => {
    response.statusCode = 403;
    response.end(
      "POST operation not supported on /dishes" + request.params.dishId
    );
  })

  // .put((request, response, next) => {
  //   Dishes.findByIdAndUpdate(
  //     request.params.dishId,
  //     {
  //       $set: require.body
  //     },
  //     { new: true }
  //   )
  //     .then(
  //       dish => {
  //         console.log("Dish found by id ", dish);

  //         response.statusCode = 200;
  //         response.setHeader("Content-Type", "application/json");
  //         response.json(dish);
  //       },
  //       err => next(err)
  //     )
  //     .catch(err => next(err));
  // })
  .put((req, res, next) => {
    Dishes.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, { new: true })
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
  .delete((request, response, next) => {
    Dishes.findByIdAndRemove(request.params.dishId)
    .then(
      resp => {
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json");
        response.json(resp);
      },
      err => next(err)
    )
    .catch(err => next(err));
  });

module.exports = dishRouter;
