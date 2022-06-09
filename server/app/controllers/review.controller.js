const Review = require('../models/review.model.js')
const Restaurant = require('../models/restaurant.model.js')
const User = require('../models/user.model.js')

// Create and Save a new Review
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
  } else if (
    !req.body.rating ||
    req.body.comment === '' ||
    !req.body.restaurant_id ||
    !req.body.user_id ||
    req.body.visit_at === ''
  ) {
    res.status(400).send({
      message: 'Invalid Request Data',
    })
  } else {
    Restaurant.findById(req.body.restaurant_id, (err, rest) => {
      if (rest) {
        User.findById(req.body.user_id, (err, user) => {
          if (user && user.role === 'user') {
            // Save Review in the database
            Review.create(req.body, (err, data) => {
              if (err)
                res.status(500).send({
                  message:
                    err.message ||
                    'An error occurred while creating the review.',
                })
              else {
                res.send(data)
              }
            })
          } else {
            res.status(400).send({
              message: 'Invalid Request Data',
            })
          }
        })
      } else {
        res.status(400).send({
          message: 'Invalid Request Data',
        })
      }
    })
  }
}

// Retrieve all Reviews from the database.
exports.findAll = (req, res) => {
  let page = parseInt(req.query.page)
  let limit = parseInt(req.query.limit)
  let offset = (page - 1) * limit
  Review.getAll(offset, limit, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'An error occurred while retrieving the reviews.',
      })
    else res.send(data)
  })
}

// Retrieve restuarants by owner
exports.findByRestaurant = (req, res) => {
  Review.findByRestaurantID(req.params.restaurantId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Restaurant with restaurantId ${req.params.restaurantId} could not be found.`,
        })
      } else {
        res.status(500).send({
          message: `An error occurred while retrieving the restaurant with restaurantId ${req.params.restaurantId}`,
        })
      }
    } else res.send(data)
  })
}

// Delete a Review with the specified ReviewId in the request
exports.delete = (req, res) => {
  Review.remove(req.params.reviewId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Review with reviewId ${req.params.reviewId} could not be found.`,
        })
      } else {
        res.status(500).send({
          message: `Could not delete review with reviewId ${req.params.reviewId}`,
        })
      }
    } else res.send({ message: `Review deleted successfully!` })
  })
}

exports.findOne = (req, res) => {
  Review.findById(req.params.reviewId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Review with reviewId ${req.params.reviewId} could not be found.`,
        })
      } else {
        res.status(500).send({
          message: `An error occurred while retrieving review with reviewId ${req.params.reviewId}`,
        })
      }
    } else res.send(data)
  })
}

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
  } else if (
    req.body.comment === '' ||
    !req.body.user_id ||
    !req.body.rating ||
    !req.body.restaurant_id
  ) {
    res.status(400).send({
      message: 'Invalid Request Data',
    })
  } else {
    Restaurant.findById(req.body.restaurant_id, (err, rest) => {
      if (rest) {
        User.findById(req.body.user_id, (err, user) => {
          if (user && user.role === 'user') {
            Review.updateById(
              req.params.reviewId,
              new Review(req.body),
              (err, data) => {
                if (err) {
                  if (err.kind === 'not_found') {
                    res.status(404).send({
                      message: `Review with reviewId ${req.params.reviewId} could not be found.`,
                    })
                  } else {
                    res.status(500).send({
                      message:
                        'An error occurred while updating Review with reviewId ' +
                        req.params.reviewId,
                    })
                  }
                } else res.send(data)
              },
            )
          } else {
            res.status(400).send({
              message: 'Invalid Request Data',
            })
          }
        })
      } else {
        res.status(400).send({
          message: 'Invalid Request Data',
        })
      }
    })
  }
}
