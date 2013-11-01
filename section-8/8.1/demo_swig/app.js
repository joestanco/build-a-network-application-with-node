
// app.js
//
// Packt Publishing - Build a Network Application with Node
// Example application using Swig view templates

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , swig = require('swig');

var app = express();

app.set('port', process.env.PORT || 3000);
app.engine('.html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', false);
swig.setDefaults({ cache: false });
app.use(express.favicon(__dirname + '/public/favicon.ico', { maxAge: 2592000000 })); // Cache for 30 days
app.use(app.router);
app.use(express.static(__dirname + '/public'));
app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
