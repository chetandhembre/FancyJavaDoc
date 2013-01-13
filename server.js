var express = require ("express");
var server = express();
var fs = require("fs");
server.listen(3000);


server.use(express.static(__dirname ));

server.get("/data.json",function(req,res){

fs.readFile("./data.json",function(err,data){
	console.log(data);
    if(err) {
    	res.writeHead(200);
    	res.end("Error in loading data");
    } else {
    	res.writeHead(200,{
    		"Content-Type":"json",

    	});
    	res.end(data);
    }
});
});


server.get("/info.json",function(req,res){

fs.readFile("./info.json",function(err,data){
	console.log(data);
    if(err) {
    	res.writeHead(200);
    	res.end("Error in loading data");
    } else {
    	res.writeHead(200,{
    		"Content-Type":"json",

    	});
    	res.end(data);
    }
});
});