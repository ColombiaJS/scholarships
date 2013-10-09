
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

var config = {
  donateUrl: '/donate'
};

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

app.get('/', function(req, res) {
  res.render('index', {
    title: 'JSConf Colombia Scholarships',
    config: config
  });
});

app.get('/apply', function(req, res) {
  res.render('apply', {
    title: 'Applica a una beca de JSConf.co',
    config: config
  });
});

app.get('/donate', function(req, res) {
  res.render('donate', {
    title: 'Donate a scholarship',
    config: config
  });
});

app.get('*', function(req, res) {
  res.redirect('/');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
