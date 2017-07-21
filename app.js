const express = require('express')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`)
})