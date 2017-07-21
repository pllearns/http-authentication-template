const express = require('express')
const router = express.Router()
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')
const database = require('../database')

router.get('/', (req, res, next) => {
  res.render('profile', {
    session: req.session
  })
})

module.exports = router