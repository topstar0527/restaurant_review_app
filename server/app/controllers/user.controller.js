const User = require('../models/user.model.js')
const secretConfig = require('../config/secret.config.js')
const jwt = require('jsonwebtoken')
// Create and Save a new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
  } else if (req.body.role === 'admin') {
    res.status(400).send({
      message: 'Cannot create admin!',
    })
  } else {
    User.findByUserName(req.body.username, (err, data) => {
      if (err && err.kind === 'not_found') {
        // Create a new user
        const newUser = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          username: req.body.username,
          hash: req.body.password,
          role: req.body.role,
        })

        // Save user in the database
        User.create(newUser, (err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || 'An error occurred while creating the user.',
            })
          else res.send(data)
        })
      } else if (data) {
        res.status(409).send({
          message: 'Username already exists.',
        })
      } else if (err) {
        res.status(500).send({
          message: err.message || 'An error occurred while retrieving user.',
        })
      }
    })
  }
}

// Login user
exports.login = (req, res) => {
  User.authenticate(req.body, (err, data) => {
    if (data) {
      const token = jwt.sign(
        { sub: data.id, role: data.role },
        secretConfig.secret,
      )
      res.status(200).send({
        access_token: token,
        data: omitPassword(data),
      })
    } else if (err && err.kind === 'not_found') {
      res.status(404).send({
        message: 'Username does not exist.',
      })
    } else if (err && err.kind === 'not_match') {
      res.status(500).send({
        message: 'Invalid password.',
      })
    } else if (err) {
      res.status(500).send({
        message: err.message || 'An error occurred while retrieving user.',
      })
    }
  })
}

// Retrieve all users from the database.
exports.findAll = (req, res) => {
  let page = parseInt(req.query.page)
  let limit = parseInt(req.query.limit)
  let offset = (page - 1) * limit

  User.getAll(offset, limit, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'An error occurred while retrieving users.',
      })
    else {
      res.send(data)
    }
  })
}

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
  User.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `User with userId ${req.params.userId}  could not be found.`,
        })
      } else {
        res.status(500).send({
          message: `Could not delete user with userId ${req.params.userId}.`,
        })
      }
    } else res.send({ message: `User deleted successfully!` })
  })
}

exports.findOne = (req, res) => {
  User.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `User with userId ${req.params.userId}  could not be found.`,
        })
      } else {
        res.status(500).send({
          message: `An error occurred while retrieving user with userId ${req.params.userId}`,
        })
      }
    } else res.send(omitPassword(data))
  })
}

exports.findByRole = (req, res) => {
  User.findByRole(req.params.userType, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'An error occurred while retrieving users.',
      })
    else res.send(data)
  })
}

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
  } else if (
    req.body.firstName === '' ||
    req.body.lastName === '' ||
    req.body.username === ''
  ) {
    res.status(400).send({
      message: 'Invalid Request Data',
    })
  } else if (req.body.role === 'admin') {
    res.status(400).send({
      message: 'You cannot update user as Admin',
    })
  } else {
    User.findById(req.params.userId, (err, user) => {
      if (user) {
        if (user.username != req.body.username) {
          // if username changed
          User.findByUserName(req.body.username, (err, data) => {
            if (data) {
              res.status(409).send({
                message: 'Username already exists.',
              })
            } else if (err && err.kind === 'not_found') {
              const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                hash: req.body.password,
                role: req.body.role,
              })

              User.updateById(
                req.params.userId,
                new User(newUser),
                (err, data) => {
                  if (err) {
                    if (err.kind === 'not_found') {
                      res.status(404).send({
                        message: `User with userId ${req.params.userId}  could not be found.`,
                      })
                    } else {
                      res.status(500).send({
                        message: `An error occurred while updating user with userId ${req.params.userId}.`,
                      })
                    }
                  } else {
                    res.send(data)
                  }
                },
              )
            }
          })
        } else {
          // if username not changed
          const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: '',
            hash: req.body.password,
            role: req.body.role,
          })

          User.updateById(req.params.userId, new User(newUser), (err, data) => {
            if (err) {
              if (err.kind === 'not_found') {
                res.status(404).send({
                  message: `User with userId ${req.params.userId}  could not be found.`,
                })
              } else {
                res.status(500).send({
                  message: `An error occurred while updating user with userId ${req.params.userId}.`,
                })
              }
            } else {
              res.status(200).send({
                message:
                  'Upate User with userId ' +
                  req.params.userId +
                  'updated successfully.',
              })
            }
          })
        }
      } else {
        res.status(400).send({
          message: 'Invalid Request',
        })
      }
    })
  }
}
function omitPassword(user) {
  const { hash, ...userWithoutPassword } = user
  return userWithoutPassword
}
