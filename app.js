var http = require('http')
var express = require('express')
var bodyParser = require('body-parser')
var PORT = process.env.PORT || 5000
const db = require('./models/index.js');
const urlShortener = require('node-url-shortener');

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

var path = require('path')
var url = require('url')
var app = express()
app.use(express.static(path.join(__dirname, '/Public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get('/', (req, res) => {
	res.render(path.join(__dirname + '/index.html'))
});

app.get('', (req, res) => {
	var adr_ = req.path;
	var longUrl = getLongUrl(adr_);
	res.redirect(longUrl);
});

app.post('/submit/', (req, res) => {
	console.log("POST received");
	const url = req.body.url_;
	console.log(url);
	urlShortener.short(url, (err, shortUrl) => {
		db.Url.findOrCreate({where: {url : url, shortUrl: shortUrl}}).then(([urlObj, created]) => {
			console.log(`Sending back ${shortUrl} as url.`)
			res.send(shortUrl);
		});
	});
});

app.get('/check/', (req, res) => {
	console.log("Checking shortened url.");
	const url_ = req.query.url_;
	db.Url.find({where: {shortUrl: url_}}), (err, shortUrl_) => {
		if (err) {
			return res.status(404).json({ err: "Url does not exist."});
		}
		else if (shortUrl_) {
			res.send(shortUrl_)
		}
	}
});


app.listen(PORT, () => console.log(`Server started on ${PORT}`))



function getLongUrl(path_)
{
	db.Url.find({where: {shortUrl: path_}}), (err, shortUrl_) => {
		if (err) {
			return window.location.origin;
		}
		else if (shortUrl_) {
			return shortUrl_;
		}
	}
};

function createURL(path_)
{

}

function setDataBaseURL(ext_, path_)
{
	return true;
}