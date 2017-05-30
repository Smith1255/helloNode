var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongo = require('mongodb').MongoClient;
var db;

mongo.connect('mongodb://noder:1234@ds111529.mlab.com:11529/hellonode', function(err, database) {
	if(err) return console.log(err);
	db = database;
	app.listen(8080, function() {
		console.log('listening on 8080');
	})
});

app.use(bodyParser.urlencoded({extended: true}));

app.get('/hello', function(req, res){
	res.send("Hello....");
});

app.get('/', function(req, res){
	db.collection('hello').find().toArray(function(err, results){
	if (err) return console.log(err);
	res.render('index.ejs', {hello: results});
	});
});
app.post('/hello', function(req, res) {
	db.collection('hello').save(req.body, function(err, results){
		if (err) return console.log(err);
		console.log('saved to database');
		res.redirect('/');
	});
});

app.set('view engine', 'ejs');
