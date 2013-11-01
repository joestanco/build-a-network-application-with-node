
// app.js
//
// Packt Publishing - Build a Network Application with Node
// Todo application using the Express web application framework

var express = require('express')
  , routes = require('./routes')
  , http = require('http');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.favicon(__dirname + '/public/favicon.ico', { maxAge: 2592000000 })); // Cache for 30 days
app.use(app.router);
app.use(express.static(__dirname + '/public'));
app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
