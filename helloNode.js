var express = require('express');
app = express();

app.get('/hello', function(req, res) {
	res.send("Hello...");
});
app.get('/node', function(req, res) {
        res.send("...Node!");
});
app.get('/', function(req, res) {
        res.send("Hello Node!");
});

app.listen(8080, function() {
	console.log("Spinning up on port 8080...");
});



