const bcrypt = require('bcrypt')
const saltRounds = 10
const pgp = require('pg-promise')();
const connection = {
  host: 'localhost',
  port: 5432,
  database: 'http-auth-template' 
}

const db = pgp(connection)

console.log('Am I connected?', connection)

const getUser = (id) => {
  db.one('SELECT * FROM users WHERE id=$1')
}

const createUser = (attributes) => {
  const sql = `
    INSERT INTO 
      users (email, encrypted_password)
    VALUES
      ($1, $2)
    RETURNING 
    *
  `
  const encrypted_password = bcrypt.hashSync(attributes.password, saltRounds)
  const variables = [
    attributes.email,
    encrypted_password
  ]

  return db.oneOrNone(sql, variables)
}

const authenticateUser = (email, password) => {
  const sql = `
    SELECT
      id, encrypted_password
    FROM 
      users
    WHERE 
      email=$1
    LIMIT
      1
  `
  return db.oneOrNone(sql, [email])
    .then(user => {
      return user && bcrypt.compareSync(password, user.encrypted_password) ? user.id : null 
    })
}

const deleteUser = (id) => {
  const sql = `
    DELETE FROM 
      users
      *
    WHERE 
      id=$1
  `
  const variables = [userId]
  return db.none(sql, variables)
}

module.exports = {
  getUser,
  createUser,
  authenticateUser,
  deleteUser
}
