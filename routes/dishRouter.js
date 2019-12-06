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
    // "Will send details of the dish: " + request.params.dishId + " to you! "
    // + request.params.recipeId

  .get((request, response, next) => {
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
      "POST operation not supported on /dishes/" + request.params.dishId
    );
  })

  .put((req, res, next) => {
    Dishes.findByIdAndUpdate(
      req.params.dishId,
      {
        $set: req.body
      },
      { new: true }
    )
      .then(
        dish => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(dish);
        },
        err => next(err)
      )
      .catch(err => next(err));
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

/************************************
 *
 * MODIFYING THE COMMENTS ENDPOINTS
 *
 * *********************************/
dishRouter
  .route("/:dishId/comments/")

  .get((request, response, next) => {
    // response.end("Will send all the dishes to you!");

    Dishes.findById(request.params.dishId)
      .then(
        dish => {
          if (dish != null) {
            response.statusCode = 200;
            response.setHeader("Content-Type", "application/json");
            response.json(dish.comments);
          } else {
            err = new Error("Dish " + request.params.dishId + " not found");
            err.status = 404;
            return next(err);
          }
        },
        err => next(err)
      )
      .catch(err => next(err));
  })

  .post((request, response, next) => {
    Dishes.findById(request.params.dishId)
      .then(
        dish => {
          if (dish != null) {
            dish.comments.push(request.body);
            dish.save().then(dish => {
              response.statusCode = 200;
              response.setHeader("Content-Type", "application/json");
              response.json(dish);
            }),
              err => next(err);
          } else {
            err = new Error("Dish " + request.params.dishId + " not found");
            err.status = 404;
            return next(err);
          }
        },
        err => next(err)
      )
      .catch(err => next(err));
  })

  .put((request, response, next) => {
    response.statusCode = 403;
    response.end(
      "PUT operation not supported on /dishes/" +
        request.params.dishId +
        "/comments"
    );
  })

  .delete((request, response, next) => {
    Dishes.findById(request.params.dishId)
      .then(
        dish => {
          if (dish != null) {
            for (var i = dish.comments.length - 1; i >= 0; i--) {
              dish.comments.id(dish.comments[i]._id).remove();
            }

            dish.save().then(dish => {
              response.statusCode = 200;
              response.setHeader("Content-Type", "application/json");
              response.json(dish);
            }),
              err => next(err);
          } else {
            err = new Error("Dish " + request.params.dishId + " not found");
            err.status = 404;
            return next(err);
          }
        },
        err => next(err)
      )
      .catch(err => next(err));
  });

  dishRouter.route('/:dishId/comments/:commentId')
  .get((req,res,next) => {
      Dishes.findById(req.params.dishId)
      .then((dish) => {
          if (dish != null && dish.comments.id(req.params.commentId) != null) {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(dish.comments.id(req.params.commentId));
          }
          else if (dish == null) {
              err = new Error('Dish ' + req.params.dishId + ' not found');
              err.status = 404;
              return next(err);
          }
          else {
              err = new Error('Comment ' + req.params.commentId + ' not found');
              err.status = 404;
              return next(err);            
          }
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
      res.statusCode = 403;
      res.end('POST operation not supported on /dishes/'+ req.params.dishId
          + '/comments/' + req.params.commentId);
  })
  .put((req, res, next) => {
      Dishes.findById(req.params.dishId)
      .then((dish) => {
          if (dish != null && dish.comments.id(req.params.commentId) != null) {
              if (req.body.rating) {
                  dish.comments.id(req.params.commentId).rating = req.body.rating;
              }
              if (req.body.comment) {
                  dish.comments.id(req.params.commentId).comment = req.body.comment;                
              }
              dish.save()
              .then((dish) => {
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.json(dish);                
              }, (err) => next(err));
          }
          else if (dish == null) {
              err = new Error('Dish ' + req.params.dishId + ' not found');
              err.status = 404;
              return next(err);
          }
          else {
              err = new Error('Comment ' + req.params.commentId + ' not found');
              err.status = 404;
              return next(err);            
          }
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
      Dishes.findById(req.params.dishId)
      .then((dish) => {
          if (dish != null && dish.comments.id(req.params.commentId) != null) {
              dish.comments.id(req.params.commentId).remove();
              dish.save()
              .then((dish) => {
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.json(dish);                
              }, (err) => next(err));
          }
          else if (dish == null) {
              err = new Error('Dish ' + req.params.dishId + ' not found');
              err.status = 404;
              return next(err);
          }
          else {
              err = new Error('Comment ' + req.params.commentId + ' not found');
              err.status = 404;
              return next(err);            
          }
      }, (err) => next(err))
      .catch((err) => next(err));
  });

module.exports = dishRouter;
