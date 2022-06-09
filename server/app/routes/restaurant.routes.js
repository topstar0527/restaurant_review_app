module.exports = (app) => {
  const restaurants = require('../controllers/restaurant.controller.js')
  const authorize = require('../_helpers/authorize.js')
  const Role = require('../_helpers/role')
  // Create a new restaurant
  app.post('/restaurants/add', authorize(Role.Owner), restaurants.create)
  // Upload file
  app.post('/restaurants/file', authorize(Role.Owner), restaurants.saveFile)
  // Retrieve all restaurants
  app.get('/restaurants', authorize(), restaurants.findAll)
  // Retrieve restaurant by owner
  app.get(
    '/restaurants/filterbyonwer/:ownerId',
    authorize(Role.Owner),
    restaurants.findByOwner,
  )
  // Retrieve restaurant by restaurantId
  app.get('/restaurants/:restaurantId', authorize(), restaurants.findOne)
  // Update restaurant by restaurantId
  app.put(
    '/restaurants/:restaurantId',
    authorize([Role.Admin, Role.Owner]),
    restaurants.update,
  )
  // Delete a restaurant by restaurantId
  app.delete(
    '/restaurants/:restaurantId',
    authorize([Role.Admin, Role.Owner]),
    restaurants.delete,
  )
}
