
// app.js
//
// Packt Publishing - Build a Network Application with Node
// Basic web server

var routes = require("routes");

require("http").createServer(function (req, res) {

	var url = req.url,
	method = req.method.toLowerCase();

  if (typeof routes[method] !== "undefined" && typeof routes[method][url] == "function") {
    return routes[method][url](req, res);
  }

  res.writeHead(404, { "Content-Type": "text/html" });
  res.end("Page not found: " + req.url);

}).listen(8000);