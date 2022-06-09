const sql = require('./db.js')

// Constructor
const Restaurant = function (restaurant) {
  this.name = restaurant.name
  this.owner_id = restaurant.owner_id
  this.description = restaurant.description
  this.image = restaurant.image
}

Restaurant.create = async (newrestaurant, result) => {
  sql.query('INSERT INTO restaurants SET ?', newrestaurant, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }

    result(null, { id: res.insertId, ...newrestaurant })
  })
}

Restaurant.findById = async (restaurantId, result) => {
  var sqlQuery =
    'SELECT restaurants.*, users.username AS ownername FROM reviewrestaurantapp.restaurants INNER JOIN reviewrestaurantapp.users ON (restaurants.owner_id = users.id) WHERE restaurants.id = ? '

  sql.query(sqlQuery, [restaurantId], (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }

    if (res.length) {
      result(null, res[0])
      return
    }

    // Restaurant with restaurantId could not be found
    result({ kind: 'not_found' }, null)
  })
}

Restaurant.findByOwnerID = async (ownerId, params, result) => {
  let page = parseInt(params.page)
  let limit = parseInt(params.limit)
  let offset = (page - 1) * limit
  let minRating = parseFloat(params.minaverating)
  let maxRating = parseFloat(params.maxaverating)

  var sqlQuery =
    'SELECT ' +
    'restaurants.* ' +
    ', users.username ' +
    ', reviews.rating ' +
    ',ROUND(AVG(reviews.rating), 1) AS ave_rating ' +
    ',COUNT(reviews.rating) AS review_count ' +
    'FROM ' +
    'reviewrestaurantapp.restaurants ' +
    'LEFT JOIN reviewrestaurantapp.reviews ' +
    ' ON (restaurants.id = reviews.restaurant_id) ' +
    'LEFT JOIN reviewrestaurantapp.users ' +
    ' ON (restaurants.owner_id = users.id) ' +
    'WHERE restaurants.owner_id = ? ' +
    'GROUP BY restaurants.id ' +
    'ORDER BY ave_rating DESC '

  sql.query(sqlQuery, [ownerId], (err, data) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    if (data.length) {
      let filteredData = data.filter(
        (item) => item.ave_rating >= minRating && item.ave_rating <= maxRating,
      )
      let totalCount = filteredData.length
      resData =
        page === -1 ? filteredData : filteredData.slice(offset, offset + limit)
      result(null, { totalCount: totalCount, res: resData })
      return
    }

    // Restaurant with ownerId could not be found
    result({ kind: 'not_found' }, null)
  })
}

Restaurant.getAll = async (params, result) => {
  let page = parseInt(params.page)
  let limit = parseInt(params.limit)
  let offset = (page - 1) * limit
  let minRating = parseFloat(params.minaverating)
  let maxRating = parseFloat(params.maxaverating)

  var sqlQuery =
    'SELECT ' +
    'restaurants.* ' +
    ', users.username ' +
    ', reviews.rating ' +
    ',AVG(reviews.rating) AS ave_rating ' +
    ',COUNT(reviews.rating) AS review_count ' +
    'FROM ' +
    'reviewrestaurantapp.restaurants ' +
    'LEFT JOIN reviewrestaurantapp.reviews ' +
    ' ON (restaurants.id = reviews.restaurant_id) ' +
    'LEFT JOIN reviewrestaurantapp.users ' +
    ' ON (restaurants.owner_id = users.id) ' +
    'GROUP BY restaurants.id ' +
    'ORDER BY ave_rating DESC '

  sql.query(sqlQuery, (err, data) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
      return
    } else if (data.length) {
      let filteredData = data.filter(
        (item) => item.ave_rating >= minRating && item.ave_rating <= maxRating,
      )
      let totalCount = filteredData.length
      resData =
        page === -1 ? filteredData : filteredData.slice(offset, offset + limit)
      result(null, { totalCount: totalCount, res: resData })
      return
    }
    result({ kind: 'not_found' }, null)
  })
}

Restaurant.remove = async (restaurantId, result) => {
  sql.query(
    'DELETE FROM restaurants WHERE id = ?',
    [restaurantId],
    (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(null, err)
        return
      }

      if (res.affectedRows == 0) {
        // Restaurant with restaurantId could not be found
        result({ kind: 'not_found' }, null)
        return
      }

      result(null, res)
    },
  )
}

Restaurant.findByName = async (name, result) => {
  sql.query(`SELECT * FROM restaurants WHERE name = ? `, [name], (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }

    if (res.length) {
      result(null, res[0])
      return
    }

    // Restaurant could not be found
    result({ kind: 'not_found' }, null)
  })
}

Restaurant.updateById = async (restaurantId, restaurant, result) => {
  sql.query(
    'UPDATE restaurants SET name = ?, owner_id = ?, description = ?, image = ? WHERE id = ?',
    [
      restaurant.name,
      restaurant.owner_id,
      restaurant.description,
      restaurant.image,
      restaurantId,
    ],
    (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(null, err)
        return
      }

      if (res.affectedRows == 0) {
        // Restaurant could not be found
        result({ kind: 'not_found' }, null)
        return
      }

      result(null, { id: restaurantId, ...restaurant })
    },
  )
}

module.exports = Restaurant
