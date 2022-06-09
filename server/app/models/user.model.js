const sql = require('./db.js')
const bcrypt = require('bcryptjs')

// Constructor
const User = function (user) {
  this.firstName = user.firstName
  this.lastName = user.lastName
  this.username = user.username
  this.hash = user.hash
  this.role = user.role
}

User.create = async (newuser, result) => {
  newuser.hash = await bcrypt.hash(newuser.hash, 10)

  sql.query('INSERT INTO users SET ?', newuser, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }

    result(null, { id: res.insertId, ...newuser })
  })
}

User.findById = async (userId, result) => {
  sql.query(`SELECT * FROM users WHERE id = ?`, [userId], (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }

    if (res.length) {
      result(null, res[0])
      return
    }

    // User with userId could not be found
    result({ kind: 'not_found' }, null)
  })
}

User.findByRole = async (userType, result) => {
  sql.query(`SELECT * FROM users WHERE role = ?`, [userType], (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }

    if (res.length) {
      result(null, res)
      return
    }

    // User with userId could not be found
    result({ kind: 'not_found' }, null)
  })
}

User.getAll = async (offset, limit, result) => {
  sql.query('SELECT COUNT(*) AS TotalCount FROM users', (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
      return
    } else {
      let totalCount = res[0].TotalCount

      var sqlQuery = 'SELECT * FROM users LIMIT ? OFFSET ?'
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

User.remove = async (userId, result) => {
  sql.query('DELETE FROM users WHERE id = ?', [userId], (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
      return
    }

    if (res.affectedRows == 0) {
      // User with userId could not be found
      result({ kind: 'not_found' }, null)
      return
    }

    result(null, res)
  })
}

User.findByUserName = async (username, result) => {
  sql.query(
    `SELECT * FROM users WHERE username = ?`,
    [username],
    (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(err, null)
        return
      }

      if (res.length) {
        result(null, res[0])
        return
      }

      // User could not be found
      result({ kind: 'not_found' }, null)
    },
  )
}

User.authenticate = async (user, result) => {
  sql.query(
    `SELECT * FROM users WHERE username = ?`,
    [user.username],
    (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(err, null)
        return
      } else if (res.length) {
        bcrypt.compare(user.password, res[0].hash, function (err, isSame) {
          if (isSame) {
            result(null, res[0])
          } else {
            result({ kind: 'not_match' }, null)
          }
        })
      } else {
        // User with username could not be found
        result({ kind: 'not_found' }, null)
      }
    },
  )
}

User.updateById = async (id, newuser, result) => {
  var sqlQuery = 'UPDATE users SET firstName = ?, lastName = ?, role = ?'
  var hashedpassword = ''
  var value = [newuser.firstName, newuser.lastName, newuser.role]
  if (newuser.username !== '') {
    sqlQuery = sqlQuery + ', username = ? '
    value.push(user.username)
  }

  if (newuser.password !== '') {
    sqlQuery = sqlQuery + ', hash = ? '
    hashedpassword = await bcrypt.hash(newuser.hash, 10)
    value.push(hashedpassword)
  }
  sqlQuery = sqlQuery + 'WHERE id = ?'
  value.push(id)
  sql.query(sqlQuery, value, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
      return
    }

    if (res.affectedRows == 0) {
      // User could not be found
      result({ kind: 'not_found' }, null)
      return
    }
    result(null, { id: id, ...newuser })
  })
}

module.exports = User
