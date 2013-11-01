
// app.js
//
// Packt Publishing - Build a Network Application with Node
// Static server using Connect middleware

var router = require("router"),
  app = require("connect");

app.errorHandler.title = "Image Gallery";

app.createServer()
  .use(app.query())
  .use(app.logger("short"))
  .use(app.favicon("favicon.ico"))
  .use(app.static(__dirname + "/public"))
  .use(app.multipart({ uploadDir: __dirname + "/public/img" }))
  .use(router())
  .use(app.errorHandler())
  .listen(8000);
