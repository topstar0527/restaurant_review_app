const Restaurant = require('../models/restaurant.model.js')
const User = require('../models/user.model.js')
const path = require('path')
// Upload file
exports.saveFile = (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file was uploaded' })
  }
  const file = req.files.file
  const timeStamp = new Date().getTime()
  const fileName = `${timeStamp}-${file.name}`
  const filePath = path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    'public/uploads/restaurants/',
  )
  file.mv(`${filePath}/${fileName}`, (err) => {
    if (err) {
      console.error(err)
      return res.status(500).send(err)
    }

    res.json(`/uploads/restaurants/${fileName}`)
  })
}

// Create and Save a new restaurant
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
  } else if (req.body.name === '' || req.body.owner_id === '') {
    res.status(400).send({
      message: 'Invalid Request Data',
    })
  } else {
    User.findById(req.body.owner_id, (err, user) => {
      if (user && user.role === 'owner') {
        Restaurant.findByName(req.body.name, (err, data) => {
          if (err && err.kind === 'not_found') {
            // Create a restaurant with a random image url
            const randomImage = Math.floor(Math.random() * 10) + 1 + '.jpg'
            console.log(req.body)
            const newrestaurant = new Restaurant({
              name: req.body.name,
              description: req.body.description,
              owner_id: req.body.owner_id,
              image: req.body.image,
            })

            // Save restaurant in the database
            Restaurant.create(newrestaurant, (err, data) => {
              if (err)
                res.status(500).send({
                  message:
                    err.message ||
                    'An error occurred while creating the restaurant.',
                })
              else res.send(data)
            })
          } else if (data) {
            res.status(409).send({
              message: 'You have already added this restaurant!',
            })
          } else if (err) {
            res.status(500).send({
              message:
                err.message ||
                'An error occurred while retrieving the restaurants.',
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

// Retrieve all restaurants from the database.
exports.findAll = (req, res) => {
  Restaurant.getAll(req.query, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'An error occurred while retrieving the restaurants.',
      })
    else {
      res.send(data)
    }
  })
}

// Retrieve restaurant by id
exports.findOne = (req, res) => {
  Restaurant.findById(req.params.restaurantId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Restaurant with restaurantId ${req.params.restaurantId} could not be found.`,
        })
      } else {
        res.status(500).send({
          message: `An error occurred while retrieving restaurant with restaurantId ${req.params.restaurantId}.`,
        })
      }
    } else {
      res.send(data)
    }
  })
}

// Retrieve restaurants by owner
exports.findByOwner = (req, res) => {
  Restaurant.findByOwnerID(req.params.ownerId, req.query, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `The onwer with ownerId ${req.params.ownerId} could not be found.`,
        })
      } else {
        res.status(500).send({
          message: `An error occurred while retrieving owner with ownerId ${req.params.ownerId}.`,
        })
      }
    } else {
      res.send(data)
    }
  })
}

// Delete a restaurant with the specified restaurantId in the request
exports.delete = (req, res) => {
  Restaurant.remove(req.params.restaurantId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Restaurant with restaurantId ${req.params.restaurantId} could not be found.`,
        })
      } else {
        res.status(500).send({
          message: `Could not delete restaurant with restaurantId ${req.params.restaurantId}.`,
        })
      }
    } else res.send({ message: `Restaurant deleted successfully!` })
  })
}

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
  } else if (req.body.name === '' || !req.body.owner_id) {
    res.status(400).send({
      message: 'Invalid Request Data',
    })
  } else {
    Restaurant.findByName(req.body.name, (err, rest) => {
      if (rest && rest.id != req.params.restaurantId) {
        res.status(409).send({
          message: 'Restaurant Name already exist',
        })
      } else if (
        (rest && rest.id == req.params.restaurantId) ||
        (err && err.kind === 'not_found')
      ) {
        User.findById(req.body.owner_id, (err, user) => {
          if (user && user.role === 'owner') {
            Restaurant.updateById(
              req.params.restaurantId,
              new Restaurant(req.body),
              (err, data) => {
                if (err) {
                  if (err.kind === 'not_found') {
                    res.status(404).send({
                      message: `Restaurant with restaurantId ${req.params.restaurantId} could not be found.`,
                    })
                  } else {
                    res.status(500).send({
                      message: `An error occurred while updating the restaurant with restaurantId ${req.params.restaurantId}.`,
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
