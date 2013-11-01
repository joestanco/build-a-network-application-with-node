
// emitter.js
//
// Packt Publishing - Build a Network Application with Node
// A simple module to emit events

var util = require('util'),
  EventEmitter = require('events').EventEmitter;

var Song = function() {};

util.inherits(Song, EventEmitter);

Song.prototype.play = function() {
  var self = this;
  setTimeout(function() {
    self.dropBeat();
  }, 2000);
  setTimeout(function() {
    self.stopBeat();
  }, 4000);
  this.emit("start");
};

Song.prototype.dropBeat = function() {
  this.emit("drop", "Do the harlem shake!!");
};

Song.prototype.stopBeat = function() {
  this.emit("stop");
};

module.exports = new Song();
