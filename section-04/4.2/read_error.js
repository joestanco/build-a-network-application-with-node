
// read_error.js
//
// Packt Publishing - Build a Network Application with Node
// Log the stack trace from a read error

var fs = require('fs'),

  openSecret = function(callback) {
    fs.open("secret.txt", "r", function(err, fd) {
      if (err) {
        console.log("\n", "NO STACK TRACE:\n", err.stack, "\n");
        err.realStack = new Error().stack;
        return callback(err);
      }
    });
  };

openSecret(function(err) {
  console.log("REAL STACK TRACE:\n", err.realStack, "\n");
});

