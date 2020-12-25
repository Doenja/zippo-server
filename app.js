const http = require('http');
const express = require('express')

const setState = require('./setState')

const app = express()
const port = 3000

app.get('/', function (req, res) {
    res.send('Zippo server')
})

app.post('/state',  function (req, res) {
    const { target, setting, value } = req.query
    setState(res, target, setting, value);
})

app.listen(port, () => {
  console.log(`Zippo server listening at http://localhost:${port}`)
})


