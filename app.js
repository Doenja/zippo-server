const express = require('express')
const bodyParser = require("body-parser");

const setLights = require('./setLights')

const router = express.Router();
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Zippo server')
})

router.post('/setLights', (req, res) => {
  const { target, setting, value} = req.body
  setLights(res, target, setting, value);
});

// add router in the Express app.
app.use("/", router);

app.listen(port, () => {
  console.log(`Zippo server listening at http://localhost:${port}`)
})


