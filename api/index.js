var express = require("express");
var expressJwt = require("express-jwt");
var bodyParser = require("body-parser");



var app = module.exports = express();

app.use(expressJwt({secret: "some-secret", skip: ["/authenticate"]}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


require("./routes")(app);


