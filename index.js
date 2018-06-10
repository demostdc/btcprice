var http = require('http');
var express = require("express");

var app = express();

var HTTP_PORT = 8080;

var httpServer = http.createServer(app).listen(HTTP_PORT);

app.get(/^(.+)$/, function(req, res){ 
    switch(req.params[0]) {
        case '/prueba.html':
            res.send("prueba ok");
            break;
    default: 
	http.get({
	host: 'api.coindesk.com',
	path: '/v1/bpi/currentprice.json'
	},
	function(response) {
	// Continuously update stream with data
	var body = '';
	response.on('data', function(d) { body += d; });
	response.on('end', function() {
                    // Data reception is done, do whatever with it!
                    var parsed = JSON.parse(body);
                    res.send("<body bgcolor='red'><H1><div align='center'>BTC [USD]: " + parsed.bpi.USD.rate + "</H1></div>");
	            });
	    }
	);
    }
});

console.log('Servidor corriendo');

