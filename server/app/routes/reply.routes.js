module.exports = (app) => {
  const authorize = require('../_helpers/authorize.js')
  const replies = require('../controllers/reply.controller.js')
  const Role = require('../_helpers/role')
  // Create a new reply
  app.post('/replies/add', authorize(Role.Owner), replies.create)
  // Retrieve all replies
  app.get('/replies', authorize(), replies.findAll)
  // Retrieve reply by replyId
  app.get('/replies/:replyId', authorize(Role.Admin), replies.findOne)
  // Retrieve reply by review
  app.get(
    '/replies/filterbyrest/:restaurantId',
    authorize(),
    replies.findByRestaurant,
  )
  // Update reply by replyId
  app.put('/replies/:replyId', authorize(Role.Admin), replies.update)
  // Delete a reply with replyId
  app.delete('/replies/:replyId', authorize(Role.Admin), replies.delete)
}
