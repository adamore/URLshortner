var http = require('http')
var express = require('express')
var bodyParser = require('body-parser')
var PORT = process.env.PORT || 5000
const { Client } = require('pg')

connectionString = {
	connectionString: process.env.DATABASE_URL,
	ssl: true
};

var path = require('path')
var url = require('url')
var app = express()
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded( { extended : true }));


app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'))
});
app.get('/index.js', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.js'))
});
app.get('/jquery.js', function(req, res) {
	res.sendFile(path.join(__dirname + '/jquery.js'))
});
app.get('fdsafdsafdsafasd', function(req, res) {
	var adr_ = req.path;
	var longUrl = getLongUrl(adr_);
	res.redirect(longUrl);
});

app.post("/submit", (req, res) => {
	res.send(req.body.name);
});
app.listen(PORT)



function getLongUrl(path_)
{
	return "https://www.google.com/";
}

function createURL(path_)
{

}

function setDataBaseURL(ext_, path_)
{
	return true;
}