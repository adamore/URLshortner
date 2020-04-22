const http = require('http')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var url = require('url')
var app = express()
var server = http.Server(app)

server.listen(PORT, function(request, response)
{
	var adr_ = request.url;
	if(adr_ == "/")
	{
		app.use(express.static('public'));
	}
	else
	{
		app.use(express.static('public'));
	}
});