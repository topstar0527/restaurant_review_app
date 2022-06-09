const mysql = require('mysql')
const dbConfig = require('../config/db.config.js')

export async function initialDb() {
  var connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
  })

  var dbName = dbConfig.DB

  var createDBSql = 'CREATE DATABASE IF NOT EXISTS ?'

  await connection.query(createDBSql, [dbName])

  await connection.query('USE', [dbName])

  var createUserTableSql =
    'CREATE TABLE IF NOT EXISTS users ( ' +
    'id int(11) NOT NULL AUTO_INCREMENT, ' +
    'firstName varchar(255) NOT NULL, ' +
    'lastName varchar(255) NOT NULL, ' +
    'username varchar(255) NOT NULL, ' +
    'hash varchar(255) NOT NULL, ' +
    'role varchar(255) NOT NULL, ' +
    'is_active tinyint(1) NOT NULL DEFAULT 1, ' +
    'PRIMARY KEY (id) ' +
    ' )'

  await connection.query(createUserTableSql)

  var createRestaurantTableSql =
    'CREATE TABLE IF NOT EXISTS restaurants ( ' +
    'id int(11) NOT NULL AUTO_INCREMENT, ' +
    'name varchar(150) NOT NULL, ' +
    'owner_id int(11) NOT NULL, ' +
    'image varchar(20) NOT NULL, ' +
    'is_active tinyint(1) NOT NULL DEFAULT 1, ' +
    'PRIMARY KEY (id) ' +
    'FOREIGN KEY (owner_id)' +
    'REFERENCES users (id)' +
    'ON DELETE CASCADE' +
    ') '

  await connection.query(createRestaurantTableSql)

  var createReviewTableSql =
    'CREATE TABLE IF NOT EXISTS reviews ( ' +
    'id int(11) NOT NULL AUTO_INCREMENT, ' +
    'user_id int(11) NOT NULL, ' +
    'restaurant_id int(11) NOT NULL, ' +
    'rating int(11) NOT NULL, ' +
    'comment varchar(500) NOT NULL, ' +
    'is_active tinyint(1) NOT NULL DEFAULT 1, ' +
    'created_at timestamp NOT NULL DEFAULT current_timestamp(), ' +
    'visit_at date NOT NULL, ' +
    'PRIMARY KEY (id) ' +
    'FOREIGN KEY (user_id)' +
    'REFERENCES users (id)' +
    'ON DELETE CASCADE' +
    'FOREIGN KEY (restaurant_id)' +
    'REFERENCES restaurants (id)' +
    'ON DELETE CASCADE' +
    ')'
  await connection.query(createReviewTableSql)

  var createReplyTableSql =
    'CREATE TABLE IF NOT EXISTS reply ( ' +
    'id int(11) NOT NULL AUTO_INCREMENT, ' +
    'reply varchar(500) NOT NULL, ' +
    'review_id int(11) NOT NULL, ' +
    'restaurant_id int(11) NOT NULL, ' +
    'is_active tinyint(1) NOT NULL DEFAULT 1, ' +
    'created_at timestamp NOT NULL DEFAULT current_timestamp(), '
  ;('PRIMARY KEY (id) ')
  'FOREIGN KEY (review_id)' +
    'REFERENCES reviews (id)' +
    'ON DELETE CASCADE' +
    'FOREIGN KEY (restaurant_id)' +
    'REFERENCES restaurants (id)' +
    'ON DELETE CASCADE' +
    ') '
  await connection.query(createReplyTableSql)
}
