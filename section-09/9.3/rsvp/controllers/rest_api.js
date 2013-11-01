
// rest_api.js
//
// Packt Publishing - Build a Network Application with Node
// RESTful API for managing events

var models = require('../models/event.js'),
  Event = models.eventModel;

exports.create_event = function(req, res) {
  
  var method = req.method.toLowerCase();

  if (method === "get") {

    // Show "Add Event" form

  } else if (method === "post") {

    // Save new event

  }

};

exports.update_event = function(req, res) {

  var method = req.method.toLowerCase();

  if (method === "get") {

    // Show "Update Event" form

  } else if (method === "put") {

    // Save changes to event

  }
};

exports.show_event = function(req, res, next) {

  // Show event details

};

exports.list_events = function(req, res) {

  // Show a list of all events in database

};

exports.destroy_event = function(req, res) {

  // Remove event from database

};














