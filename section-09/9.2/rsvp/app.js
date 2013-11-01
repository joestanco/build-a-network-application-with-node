
// app.js
//
// Packt Publishing - Build a Network Application with Node
// Event RSVP application using the Express + Mongoose

var express = require('express')
  , routes = require('./routes')
  , error_handlers = require('./lib/error_handlers')
  , http = require('http')
  , pkginfo = require('pkginfo')(module, 'title', 'description')
  , partials = require('express-partials')
  , fs = require("fs")
  , accessLog = fs.createWriteStream('./logs/access.log', { 'flags': 'a' })
  , dbConfig = require('./db_config.js')
  , db = require('./lib/db_connect.js');
  
var app = express();

app.locals.open = '{{';
app.locals.close = '}}';
app.use(partials());

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('pkginfo', { 'title': exports.title, 'description': exports.description });
app.set('view engine', 'ejs');
app.use(express.favicon(__dirname + '/public/favicon.ico', { maxAge: 2592000000 }));
app.use(express.logger({ 'format': 'dev', 'stream': accessLog }));
app.use(express.cookieParser('qp4ul8chs0crqe31'));
app.use(express.session({ 'secret': 'qp4ul8chs0crqe31' }));
app.use(app.router);
app.use(express.static(__dirname + '/public'));

if ('development' == app.get('env')) {
  express.errorHandler.title = exports.title;
  app.use(express.errorHandler());
}

app.get("/", routes.index);

app.use(error_handlers.pageNotFoundHandler);
app.use(error_handlers.logErrors);
app.use(error_handlers.errorHandler);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
  db.connect(dbConfig, function(status) {
    if (status && status.message) console.log(status.message);
  });
});

process.on("exit", function() {
  db.disconnect(function(status) {
    if (status && status.message) console.log(status.message);
  });
});



















