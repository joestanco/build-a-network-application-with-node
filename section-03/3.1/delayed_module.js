
// delayed_module.js
//
// Packt Publishing - Build a Network Application with Node
// Emitting a ready event after a delay

var EventEmitter = require('events').EventEmitter;

module.exports = new EventEmitter();

process.nextTick(function() {

module.exports.message = "esprit d'escalier";
module.exports.emit('ready');

});