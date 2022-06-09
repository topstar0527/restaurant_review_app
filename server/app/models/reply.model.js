const sql = require('./db.js')

// Constructor
const Reply = function (reply) {
  this.reply = reply.reply
  this.restaurant_id = reply.restaurant_id
  this.review_id = reply.review_id
}

Reply.create = async (newReply, result) => {
  sql.query('INSERT INTO reply SET ?', newReply, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }

    result(null, { id: res.insertId, ...newReply })
  })
}

Reply.findById = async (replyId, result) => {
  var sqlQuery =
    'SELECT ' +
    'reply.* ' +
    ', restaurants.name ' +
    ' , reviews.comment ' +
    'FROM ' +
    'reviewrestaurantapp.reply ' +
    'INNER JOIN reviewrestaurantapp.reviews ' +
    'ON (reply.review_id = reviews.id) ' +
    'LEFT JOIN reviewrestaurantapp.restaurants ' +
    'ON (reply.restaurant_id = restaurants.id) ' +
    'WHERE reply.id = ?'
  sql.query(sqlQuery, [replyId], (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }

    if (res.length) {
      result(null, res[0])
      return
    }

    // Reply with the replyId could not be found
    result({ kind: 'not_found' }, null)
  })
}

Reply.getAll = async (query, result) => {
  let page = parseInt(query.page)
  let limit = parseInt(query.limit)
  let offset = (page - 1) * limit

  sql.query('SELECT COUNT(*) AS TotalCount FROM reply', (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
      return
    } else {
      let totalCount = res[0].TotalCount
      var sqlQuery =
        'SELECT ' +
        'reply.* ' +
        ', restaurants.name ' +
        ' , reviews.comment ' +
        ', users.username ' +
        'FROM ' +
        'reviewrestaurantapp.reply ' +
        'INNER JOIN reviewrestaurantapp.reviews ' +
        'ON (reply.review_id = reviews.id) ' +
        'LEFT JOIN reviewrestaurantapp.restaurants ' +
        'ON (reply.restaurant_id = restaurants.id) ' +
        'LEFT JOIN reviewrestaurantapp.users ' +
        'ON (restaurants.owner_id = users.id) ' +
        'LIMIT ? OFFSET ?'

      sql.query(sqlQuery, [limit, offset], (err, data) => {
        if (err) {
          result(null, err)
          return
        }

        result(null, { totalCount: totalCount, res: data })
      })
    }
  })
}

Reply.remove = async (replyId, result) => {
  sql.query('DELETE FROM reply WHERE id = ?', replyId, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
      return
    }

    if (res.affectedRows == 0) {
      // Reply with the replyId could not be found
      result({ kind: 'not_found' }, null)
      return
    }

    result(null, res)
  })
}

Reply.findByRestaurant = async (restaurantId, result) => {
  sql.query(
    `SELECT * FROM reply WHERE restaurant_id = ?`,
    [restaurantId],
    (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(err, null)
        return
      }

      if (res.length) {
        result(null, res)
        return
      }

      // Reply with the restaurantId could not be found
      result({ kind: 'not_found' }, null)
    },
  )
}

Reply.updateById = async (id, reply, result) => {
  sql.query(
    'UPDATE reply SET reply = ?, review_id = ?, restaurant_id = ? WHERE id = ?',
    [reply.reply, reply.review_id, reply.restaurant_id, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(null, err)
        return
      }

      if (res.affectedRows == 0) {
        // Reply could not be found
        result({ kind: 'not_found' }, null)
        return
      }
      result(null, { id: id, ...reply })
    },
  )
}

module.exports = Reply
