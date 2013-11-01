
// app.js
//
// Packt Publishing - Build a Network Application with Node
// Basic web server

var routes = require("routes"),
  url = require("url");

require("http").createServer(function (req, res) {

  var parsedUrl = url.parse(req.url, true),
    pathname = parsedUrl.pathname,
    method = req.method.toLowerCase();

  // Normalize pathname by removing trailing slash
  if (pathname != "/" && pathname.lastIndexOf("/") == pathname.length-1) {
    pathname = pathname.substr(0, pathname.length-1);
  }

  // Use a generic static route if the url is an image
  if (/\.(jpeg|jpg|gif|png)$/.test(parsedUrl.href)) {
    pathname = "/static";
  }

  if (typeof routes[method] !== "undefined" && typeof routes[method][pathname] == "function") {
    return routes[method][pathname](req, res);
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Page not found: " + req.url);

}).listen(8000);