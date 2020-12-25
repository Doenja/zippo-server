const http = require('http');
const express = require('express')

const setState = require('./setState')

const app = express()
const port = 3000

app.get('/', function (req, res) {
    res.send('Zippo server')
})

app.post('/state',  function (req, res) {
    const { group, state } = req.query
    setState(group, state, res);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


