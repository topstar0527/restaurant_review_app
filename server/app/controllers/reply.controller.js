const Reply = require('../models/reply.model.js')
const Restaurant = require('../models/restaurant.model.js')
const Review = require('../models/review.model.js')

// Create and Save a new Reply
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
  } else {
    if (
      req.body.reply === '' ||
      !req.body.review_id ||
      !req.body.restaurant_id
    ) {
      res.status(400).send({
        message: 'Invalid Request Data',
      })
    } else {
      Restaurant.findById(req.body.restaurant_id, (err, rest) => {
        if (rest) {
          Review.findById(req.body.review_id, (err, review) => {
            if (review) {
              // Save Reply in the database
              Reply.create(req.body, (err, data) => {
                if (err)
                  res.status(500).send({
                    message:
                      err.message ||
                      'An error occurred while creating the reply.',
                  })
                else res.send(data)
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
}

// Retrieve all Replies from the database.
exports.findAll = (req, res) => {
  Reply.getAll(req.query, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'An error occurred while retrieving the replies.',
      })
    else res.send(data)
  })
}

// Delete a Reply with the specified ReplyId in the request
exports.delete = (req, res) => {
  Reply.remove(req.params.replyId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Reply with replyId ${req.params.replyId} could not be found.`,
        })
      } else {
        res.status(500).send({
          message: `Could not delete reply with replyId ${req.params.replyId}.`,
        })
      }
    } else res.send({ message: `Reply deleted successfully!` })
  })
}

exports.findOne = (req, res) => {
  Reply.findById(req.params.replyId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Reply with replyId ${req.params.replyId} could not be found.`,
        })
      } else {
        res.status(500).send({
          message: `An error occurred while retrieving reply with replyId ${req.params.replyId}.`,
        })
      }
    } else res.send(data)
  })
}

exports.update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
  } else if (
    req.body.reply === '' ||
    !req.body.review_id ||
    !req.body.restaurant_id
  ) {
    //validData
    res.status(400).send({
      message: 'InValid Request Data',
    })
  } else {
    Review.findById(req.body.review_id, (err, data) => {
      if (data) {
        Restaurant.findById(req.body.restaurant_id, (err, rest) => {
          if (rest) {
            Reply.updateById(
              req.params.replyId,
              new Reply(req.body),
              (err, data) => {
                if (err) {
                  if (err.kind === 'not_found') {
                    res.status(404).send({
                      message: `Reply with replyId ${req.params.replyId} could not be found.`,
                    })
                  } else {
                    res.status(500).send({
                      message: `An error occurred while updating reply with replyId ${req.params.replyId}.`,
                    })
                  }
                } else res.send(data)
              },
            )
          } else {
            res.status(400).send({
              message: 'InValid Request Data',
            })
          }
        })
      } else {
        res.status(400).send({
          message: 'InValid Request Data',
        })
      }
    })
  }
}

exports.findByRestaurant = (req, res) => {
  Reply.findByRestaurant(req.params.restaurantId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Reply with replyId ${req.params.replyId} could not be found.`,
        })
      } else {
        res.status(500).send({
          message: `An error occurred while retrieving reply with replyId ${req.params.replyId}.`,
        })
      }
    } else res.send(data)
  })
}
