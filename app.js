const express = require('express')
const bodyParser = require("body-parser");

const setLights = require('./setLights')

const app = express()
const port = 3000
const jsonParser = bodyParser.json()

app.get('/', function (req, res) {
    res.send('Zippo server')
})

app.post('/setLights', jsonParser, function (req, res) {
  const { target, setting, value} = req.body
  setLights(res, target, setting, value);
})

app.listen(port, () => {
  console.log(`Zippo server listening at http://localhost:${port}`)
})


