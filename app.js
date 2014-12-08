var express = require('express'),
  jade = require('jade'),
  app = express();

var fs = require('fs'),
  movie_mp4;
app.set('view engine', 'jade');

app.use("*/css", express.static(__dirname+'/templates/css'));

app.get('/', function(req, res) {
  res.render(__dirname+'/templates/index');
});

app.get('/video', function(req, res) {
  res.render(__dirname+'/templates/video');
});

app.get('/movies/*', function(req, res) {

  fs.readFile('movies/GoPro3.mp4', function(err, data){
    if(err) throw err;
    movie_mp4 = data;
    /* begin */
    var total = movie_mp4.length;
    console.log(total);
    
    var range = req.headers.range;
    console.log(req.headers);

    var positions = range.replace(/bytes=/, "").split("-");

    var start = parseInt(positions[0], 10);
    var end = positions[1] ? parseInt(positions[1], 10) : total - 1;

    var chunksize = (end-start)+1;
    console.log(chunksize);


    res.status(206);
    res.set({
      "Content-Range": "bytes " + start + "-" + end + "/" + total, 
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4"});
    res.end(movie_mp4.slice(start, end+1), "binary");
    /* end */
  });
});


app.get('*', function(req, res) {
  res.status(404).render(__dirname+'/templates/404');
});

var server = app.listen(3000, function() {
  var host = server.address().address,
      port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});
