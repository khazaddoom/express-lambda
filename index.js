
const serverlessExpress = require('serverless-http')
const express = require('express')
const app = express()

app.use(express.json())
 
app.get('/welcome', function (req, res) {
  res.send('Hello World!')
})

app.use('*', function (req, res) {
    res.send('Welcome to the Express Lambda Server')
})
 
exports.handler = serverlessExpress(app)
