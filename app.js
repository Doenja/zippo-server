const express = require('express')

const setLights = require('./setLights')

const app = express()
const port = 3000

app.get('/', function (req, res) {
    res.send('Zippo server')
})

app.post('/setLights',  function (req, res) {
    const { target, setting, value } = req.query
    setLights(res, target, setting, value);
})

app.listen(port, () => {
  console.log(`Zippo server listening at http://localhost:${port}`)
})


