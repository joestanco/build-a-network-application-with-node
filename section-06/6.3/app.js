
// app.js
//
// Packt Publishing - Build a Network Application with Node
// Static server using Connect middleware

var router = require("router"),
  app = require("connect");
  imageFilter = function(req, res) {
    return /(jpeg|gif|png)/.test(res.getHeader("Content-Type"));
  };

app.errorHandler.title = "Image Gallery";

app.createServer()
  .use(app.responseTime())
  .use(app.query())
  .use(app.logger("short"))
  .use(app.favicon("favicon.ico"))
  .use(app.compress({ filter: imageFilter }))
  .use(app.static(__dirname + "/public", { maxAge: 604800000 }))
  .use(app.limit('1mb'))
  .use(app.multipart({ uploadDir: __dirname + "/public/img" }))
  .use(router())
  .use(app.errorHandler())
  .listen(8000);
