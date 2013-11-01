
// app.js
//
// Packt Publishing - Build a Network Application with Node
// Todo application using the Express web application framework

var express = require('express')
  , routes = require('./routes')
  , store = require('./routes/store')
  , RedisStore = require('connect-redis')(express)
  , http = require('http');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.favicon(__dirname + '/public/favicon.ico', { maxAge: 2592000000 })); // Cache for 30 days
app.use(express.cookieParser('qp4ul8chs0crqe31'));
app.use(express.session({ 'store': new RedisStore, 'secret': 'qp4ul8chs0crqe31' }));
app.use(express.urlencoded());
app.use(app.router);
app.use(express.static(__dirname + '/public'));
app.get('/', routes.index);
app.post('/save', store.save);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
