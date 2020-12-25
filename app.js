const http = require('http');
const express = require('express')

const toggle = require('./toggle')

const app = express()
const port = 3000

app.get('/toggle', function (req, res) {
    res.send('Zippo server, toggle')
    toggle()
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


