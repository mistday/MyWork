var express = require('express'),
	app = express();

app.get('/', function(req,res) {
	res.send('Hello World!');
});

var server = app.listen(3000, function() {
	var host = server.address().address,
		port = server.address().port;

	console.log('App listening at http://%s:%s', host, port);
});
