const express = require('express')
const router = express.router()

const users = require('./users')

const db = require('../database')

router.get('/login', login)

router.get('/signup', signup)