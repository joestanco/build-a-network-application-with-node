
// error_handlers.js
//
// Packt Publishing - Build a Network Application with Node
// Report an error response with the appropriate status code

var logger = require('./logger'),
  errorRoute = require('../routes/error');

exports.pageNotFoundHandler = function(req, res){
  res.status = 404;
  res.app.set("errorMessage", "Page not found.");
  errorRoute.report(req, res);
};

exports.errorHandler = function(err, req, res, next) {
  res.status = 500;
  res.app.set("errorMessage", err);
  errorRoute.report(req, res);
};

exports.logErrors = function(err, req, res, next) {
  logger.err(err.stack);
  next(err);
};
