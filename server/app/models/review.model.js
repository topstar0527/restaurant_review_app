const sql = require('./db.js')

// Constructor
const Review = function (reivew) {
  this.user_id = reivew.user_id
  this.restaurant_id = reivew.restaurant_id
  this.rating = reivew.rating
  this.comment = reivew.comment
}

Review.create = async (newReview, result) => {
  sql.query('INSERT INTO Reviews SET ?', newReview, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }

    result(null, { id: res.insertId, ...newReview })
  })
}

Review.findById = async (reviewId, result) => {
  sql.query(`SELECT * FROM reviews WHERE id = ?`, [reviewId], (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }

    if (res.length) {
      result(null, res[0])
      return
    }

    // Review with reviewId could not be found
    result({ kind: 'not_found' }, null)
  })
}

Review.findByRestaurantID = async (restaurantId, result) => {
  var sqlQuery =
    'SELECT ' +
    'reviews.* ' +
    ', users.username ' +
    ', reply.reply ' +
    'FROM ' +
    'reviewrestaurantapp.reviews ' +
    'LEFT JOIN reviewrestaurantapp.users ' +
    'ON (reviews.user_id = users.id) ' +
    'LEFT JOIN reviewrestaurantapp.reply ' +
    'ON (reviews.restaurant_id = reply.restaurant_id) AND (reviews.id = reply.review_id) ' +
    'WHERE reviews.restaurant_id = ? ' +
    'ORDER BY reviews.created_at DESC'

  sql.query(sqlQuery, [restaurantId], (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    if (res.length) {
      result(null, res)
      return
    }

    // Review with restaurantId could not be found
    result({ kind: 'not_found' }, null)
  })
}

Review.getAll = async (offset, limit, result) => {
  sql.query('SELECT COUNT(*) AS TotalCount FROM reviews', (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
      return
    } else {
      let totalCount = res[0].TotalCount
      var sqlQuery =
        'SELECT ' +
        'reviews.* ' +
        ', restaurants.name ' +
        ' , users.username ' +
        'FROM ' +
        'reviewrestaurantapp.reviews ' +
        'LEFT JOIN reviewrestaurantapp.restaurants ' +
        'ON (reviews.restaurant_id = restaurants.id) ' +
        'LEFT JOIN reviewrestaurantapp.users ' +
        'ON (reviews.user_id = users.id) ' +
        'ORDER BY reviews.visit_at DESC ' +
        'LIMIT ? OFFSET ?'

      sql.query(sqlQuery, [limit, offset], (err, data) => {
        if (err) {
          console.log('error: ', err)
          result(null, err)
          return
        }

        result(null, { totalCount: totalCount, res: data })
      })
    }
  })
}

Review.remove = async (reviewId, result) => {
  sql.query('DELETE FROM reviews WHERE id = ?', reviewId, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
      return
    }

    if (res.affectedRows == 0) {
      // Review with reviewId could not be found
      result({ kind: 'not_found' }, null)
      return
    }

    result(null, res)
  })
}

Review.updateById = async (id, review, result) => {
  sql.query(
    'UPDATE reviews SET user_id = ?, restaurant_id = ?, rating = ?, comment = ? WHERE id = ?',
    [review.user_id, review.restaurant_id, review.rating, review.comment, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(null, err)
        return
      }

      if (res.affectedRows == 0) {
        // Review could not be found
        result({ kind: 'not_found' }, null)
        return
      }

      result(null, { id: id, ...review })
    },
  )
}

module.exports = Review
