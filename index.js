var express = require('express');
var api = require('./api');
var morgan = require("morgan");


// Initializing Main Express
var app = express();
app.use(morgan("combined"));

//Including the API as a middleware
app.use('/api', api);

var port = process.env.PORT || 5000;
app.listen(port);
console.log("Starting api on port: " + port);
