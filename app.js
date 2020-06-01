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

app.post('/submit/', (req, res) => {
    console.log("POST received");
    const url = req.body.url_;
    console.log(url);
    var hashedURL = hashURL(url);
    db.Url.findOrCreate({ where: { url: url, shortUrl: hashedURL } }).then(([urlObj, created]) => {
        console.log(`Sending back ${hashedURL} as url.`)
        res.send(hashedURL);
    });

});

app.get('/check/', (req, res) => {
    console.log("Checking shortened url.");
    const url_ = req.query.url_;
    db.Url.findOne({ where: { shortUrl: url_ } }).then(longURL => {
        if (!longURL) {
            console.log("Error in finding long url.");
            return res.status(404).json({ err: "Url does not exist." });
        } else if (longURL) {
            var query_val = longURL.toJSON().url;
            console.log(`Found long url ${query_val} for short url ${url_}`);
            res.send(query_val);
        }
    });
});

app.get('*', (req, res) => {
    var adr_ = req.path.substring(1);
    console.log(`Short url ( ${adr_} ) used.`);
    console.log(`Getting long url for ${adr_}`);
    db.Url.findOne({ where: { shortUrl: adr_ } }).then(longURL => {
        if (!longURL) {
            console.log("Error in finding url");
            return window.location.origin;
        } else if (longURL) {
            console.log("Found long url");
            var query_val = longURL.toJSON().url;
            console.log(query_val);
            console.log(`Redirecting to ${query_val}`)
            res.redirect(query_val);
        }
    });
});



app.listen(PORT, () => console.log(`Server started on ${PORT}`))


function decimalToHexString(number) {
    if (number < 0) {
        number = 0xFFFFFFFF + number + 1;
    }

    return number.toString(16).toUpperCase();
};

function hashURL(url_) {
    hashCode = function(s) {
        return s.split("").reduce(function(a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
    };
    var hashed = decimalToHexString(hashCode(url_));
    return hashed;
}

function setDataBaseURL(ext_, path_) {
    return true;
}