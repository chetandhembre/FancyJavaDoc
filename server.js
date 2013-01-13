var express = require ("express");
var server = express();
var fs = require("fs");

var port = process.env.PORT || 5000;

server.listen(port);


server.use(express.static(__dirname ));

 