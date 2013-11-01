
// db_connect.js
//
// Packt Publishing - Build a Network Application with Node
// DB connection interface for Mongoose

var logger = require('./logger'),
  mongoose = require('mongoose'),
  util = require('util'),
  EventEmitter = require('events').EventEmitter,

  fireCallback = function(cb, msg) {
    if (typeof cb !== "function") return;
    cb({ message: msg || "" });
  },
  handleError = function(cb, msg) {
    if (msg) {
      msg = "MongoDB connection error: " + msg;
      logger.err(msg);
    }
    fireCallback(cb, msg);
  };

var DBConnect = function() {

  var self = this;
  self.connected = false;

  self.connect = function(connectOpts, callback) {

    if (exports.connected) return fireCallback(callback, "Already connected");

    var conn, connectStr,
      o = connectOpts,
      db = o.db || "test",
      host = o.host || "localhost",
      port = o.port || 27017,
      credentials = o.user && o.pass ? o.user + ":" + o.pass : "",
      server = o.host + ":" + o.port;

    if (credentials) {
      connectStr = "mongodb://" + credentials + "@" + server + "/" + db;
    } else {
      return handleError(callback, "Database requires username and password");
    }

    mongoose.connect(connectStr);
    conn = mongoose.connection;

    conn.on('error', function(err) {
      handleError(callback, err);
    });

    conn.once('open', function() {
      // Fire callback after onOpen has been executed on all of this connection's models
      self.emit("connected", conn);
      fireCallback(callback, "Connected to mongo database " + db + " on port " + port);
    });

    conn.on('connected', function(err) {
      exports.connected = true;
    });

    conn.on('reconnected', function(err) {
      exports.connected = true;
    });

    conn.on('disconnected', function(err) {
      self.emit("disconnected");
      exports.connected = false;
    });

  };

  self.disconnect = function(callback) {

    if (!exports.connected) return fireCallback(callback, "Can't disconnect: No connection");

    mongoose.disconnect(function() {
      fireCallback(callback, "Successfully disconnected");
    });
  };
}

util.inherits(DBConnect, EventEmitter);
module.exports = DBConnect;
