var express = require('express'),
	jade = require('jade'),
	app = express();

app.set('view engine', 'jade');

app.use("/css", express.static(__dirname+'/templates/css'));

app.get('/', function(req,res) {
	res.render(__dirname+'/templates/index');
});

var server = app.listen(3000, function() {
	var host = server.address().address,
		port = server.address().port;

	console.log('App listening at http://%s:%s', host, port);
});
