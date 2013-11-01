
// event.js
//
// Packt Publishing - Build a Network Application with Node
// Event schema

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,

  responseSchema = new Schema({
      name:     { type: String, default: "Guest" },
      email:    { type: String, required: true },
      status:   { type: String, required: true, enum: ['Yes', 'No', 'Maybe'] }
    }),

  eventSchema = new Schema({
      title:      { type: String, default: "New Event" },
      date:       { type: Date,   default: Date.now },
      responses:  [responseSchema]
    }),

  eventModel = mongoose.model('Event', eventSchema);

eventModel.schema.path('date').validate(function (value) {
  return /^\w{3}\s\w{3}\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}\s(GMT|UTC)/.test(value);
}, 'Invalid date');

eventModel.schema.path('date').validate(function (value) {
  return (Date.now()-1000) < new Date(value);
}, 'Must be a future date');

responseSchema.path('email').validate(function (value) {
  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
}, 'Invalid email');

module.exports.eventModel = eventModel;
module.exports.responseSchema = responseSchema;

