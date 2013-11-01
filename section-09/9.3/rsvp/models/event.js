
// event.js
//
// Packt Publishing - Build a Network Application with Node
// Event schema

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,

  eventSchema = new Schema({
      title:      { type: String, default: "New Event" },
      date:       { type: Date,   default: Date.now }
    }),

  eventModel = mongoose.model('Event', eventSchema);

eventModel.schema.path('date').validate(function (value) {
  return /^\w{3}\s\w{3}\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}\s(GMT|UTC)/.test(value);
}, 'Invalid date');

eventModel.schema.path('date').validate(function (value) {
  return Date.now() < new Date(value);
}, 'Must be a future date');

module.exports.eventModel = eventModel;
