module.exports = (app) => {
  const authorize = require('../_helpers/authorize')
  const users = require('../controllers/user.controller.js')
  const Role = require('../_helpers/role')

  // Create a new user
  app.post('/users/register', users.create)
  // Login a user
  app.post('/users/login', users.login)
  // Retrieve all users
  app.get('/users', authorize(Role.Admin), users.findAll)
  // Retrieve user by userId
  app.get('/users/:userId', authorize(Role.Admin), users.findOne)
  // Retrieve users by role
  app.get('/users/role/:userType', authorize(Role.Admin), users.findByRole)
  // Update user by userId
  app.put('/users/:userId', authorize(Role.Admin), users.update)
  // Delete user with userId
  app.delete('/users/:userId', authorize(Role.Admin), users.delete)
}
