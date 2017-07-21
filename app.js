const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieSession({
  name: 'session',
  keys: 'some secret',
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000
}))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.get('/', (req, res, next) => {
  res.render('index')
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`)
})