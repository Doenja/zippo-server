"use strict";
var http = require('http');
var express = require('express');
var toggle = require('./toggle');
var app = express();
var port = 3000;
app.get('/', function (req, res) {
    res.send('Zippo server');
});
app.post('/toggle', function (rec, res) {
    res.sendStatus(200);
    toggle();
});
app.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});
