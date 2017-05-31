var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongo = require('mongodb').MongoClient;
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
var db;

mongo.connect('mongodb://noder:1234@ds111529.mlab.com:11529/hellonode', function(err, database) {
	if(err) return console.log(err);
	db = database;
	app.listen(8080, function() {
		console.log('listening on 8080');
	})
});

app.get('/hello', function(req, res){
	res.send("Hello....");
});

app.get('/', function(req, res){
	db.collection('hello').find().toArray(function(err, results){
        if (err) return console.log(err);
        res.render('index.ejs', {hello: results});
    });
});
app.post('/', function(req, res) {
	db.collection('hello').save(req.body, function(err, results){
		if (err) return console.log(err);
		console.log('saved to database');
		res.redirect('/');
	});
});
app.put('/', function(req, res) {
    db.collection('hello')
    .findOneAndUpdate({name: 'Andrew Smith'}, {
        $set: {
            name: req.body.name,
            quote: req.body.quote
        }
    }, {
        sort: {_id: -1},
        upsert: true
    }, function(err, result) {
    if (err) return res.send(err);
    res.send(result)
    })
});
app.delete('/', function(req, res) {
    db.collection('hello').findOneAndDelete({name: req.body.name},
    function(err, result) {
    if (err) return res.send(500, err);
    res.json('A quote got deleted');
})
});
