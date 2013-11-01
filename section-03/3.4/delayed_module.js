
// delayed_module.js
//
// Packt Publishing - Build a Network Application with Node
// Emitting a ready event after a delay

var EventEmitter = require('events').EventEmitter;

module.exports = new EventEmitter();
 
setTimeout(function() {
  module.exports.message = "esprit d'escalier";
  module.exports.emit('ready');
}, 1000);
