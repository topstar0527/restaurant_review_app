module.exports = (app) => {
  const reviews = require('../controllers/review.controller.js')
  const authorize = require('../_helpers/authorize.js')
  const Role = require('../_helpers/role')
  // Create a new Review
  app.post('/reviews/add', authorize(), reviews.create)
  // Retrieve all Reviews
  app.get('/reviews', authorize(Role.Admin), reviews.findAll)
  // Retrieve Reviews by restaurantId
  app.get(
    '/reviews/filterbyrest/:restaurantId',
    authorize(),
    reviews.findByRestaurant,
  )
  // Retrieve Review by reviewId
  app.get('/reviews/:reviewId', authorize(Role.Admin), reviews.findOne)
  // Update Review by reviewId
  app.put('/reviews/:reviewId', authorize(Role.Admin), reviews.update)
  // Delete Review with reviewId
  app.delete('/reviews/:reviewId', authorize(Role.Admin), reviews.delete)
}
