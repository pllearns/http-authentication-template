const express = require('express')
const router = express.Router()

const users = require('./users')

const db = require('../database')

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/signup', (req, res) => {
  res.render('signup')
})

router.post('/signup', (req, res) => {
  const attributes = req.body.user
  const email = attributes.email
  const password = attributes.password
  const password_confirmation = attributes.password

  if (password !== '' && password !== password_confirmation) {
    res.render('signup', {
      error: 'Passwords Do Not Match',
      email: email,
    })
  } else {
    db.createUser(attributes)
    .then(user => {
      req.session.id = userId,
      res.redirect('/')
    })
    .catch(error => {
      res.render('index', {
        error: error,
        email: email
      })
    })
  }
})

router.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password

  db.authenticateUser(email, password)
    .then(user => {
      if (userId) {
        req.session.userId = userId
        res.redirect('/')
      } else {
        res.render('/', {
          error: 'Email or password not found'
        })
      }
    })
    .catch(error => {
      res.render('index', {
        error: error,
        email: email
      })
    })
  
})


module.exports = router
