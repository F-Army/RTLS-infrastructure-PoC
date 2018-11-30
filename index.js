var express = require('express');
var bodyParser = require("body-parser");
var app = express();

const anchors = require("./src/controller/anchors");
const rangeRoute = require("./src/controller/range");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use((req,res,next) => {
  console.log(req.body);
  next();
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use("/anchor", anchors.router);
app.use("/range", rangeRoute);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
