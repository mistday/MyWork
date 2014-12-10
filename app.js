var express = require('express'),
  jade = require('jade'),
  app = express();

var fs = require('fs'),
    url = require("url"),
    path = require("path");


app.set('view engine', 'jade');

app.use("*/css", express.static(__dirname+'/templates/css'));

app.get('/', function(req, res) {
  res.render(__dirname+'/templates/index');
});

app.get('/video', function(req, res) {
  res.render(__dirname+'/templates/video');
});

app.get('/movies/*', function(req, res) {

  var file = 'GoPro3.mp4';
  /* sent headers*/
  var file = path.resolve(__dirname, 'movies/'+file);
  var range = req.headers.range;
  var positions = range.replace(/bytes=/, "").split("-");
  var start = parseInt(positions[0], 10);

  fs.stat(file, function(err, stats) {
    var total = stats.size;
    var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
    var chunksize = (end - start) + 1;

    res.writeHead(206, {
      "Content-Range": "bytes " + start + "-" + end + "/" + total,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4"
    });
    /* create stream */
    var stream = fs.createReadStream(file, { start: start, end: end })
      .on("open", function() {
        stream.pipe(res);
      }).on("error", function(err) {
        res.end(err);
      });
  });

});


app.get('*', function(req, res) {
  res.status(404).render(__dirname+'/templates/404');
});

var server = app.listen(3000, '127.0.0.1', function() {
  var host = server.address().address,
      port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});
