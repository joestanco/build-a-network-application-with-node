
// app.js
//
// Packt Publishing - Build a Network Application with Node
// Basic web server using Connect middleware

var router = require("router"),
  headerUtil = require("header_util"),
  app = require("connect");

app.errorHandler.title = "My Connect App";

app.createServer()
  .use(app.logger("short"))
  .use(app.favicon("favicon.ico"))
  .use(headerUtil())
  .use(router())
  .use(app.errorHandler())
  .listen(8000);
