
// app.js
//
// Packt Publishing - Build a Network Application with Node
// Todo application using the Express web application framework

var express = require('express')
  , routes = require('./routes')
  , store = require('./routes/store')
  , error_handlers = require('./lib/error_handlers')
  , RedisStore = require('connect-redis')(express)
  , http = require('http')
  , fs = require("fs")
  , accessLog = fs.createWriteStream('./logs/access.log', { 'flags': 'a' })
  , partials = require('express-partials');

var app = express();

app.locals.open = '{{';
app.locals.close = '}}';
app.use(partials());

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon(__dirname + '/public/favicon.ico', { maxAge: 2592000000 })); // Cache for 30 days
app.use(express.cookieParser('qp4ul8chs0crqe31'));
app.use(express.session({ 'store': new RedisStore, 'secret': 'qp4ul8chs0crqe31' }));
app.use(express.urlencoded());
app.use(express.logger({ 'format': 'dev', 'stream': accessLog }));
app.use(app.router);
app.use(express.static(__dirname + '/public'));

if ('development' == app.get('env')) {
  express.errorHandler.title = "2 Deux";
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/save', store.save);

app.use(error_handlers.pageNotFoundHandler);
app.use(error_handlers.logErrors);
app.use(error_handlers.errorHandler);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
