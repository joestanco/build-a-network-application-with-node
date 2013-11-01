
// rest_api.js
//
// Packt Publishing - Build a Network Application with Node
// RESTful API for managing events

var models = require('../models/event.js'),
  Event = models.eventModel,
  moment = require("moment"),
  objectIdRegEx = /^[0-9a-fA-F]{24}$/,

  handleError = function(err, req, res, o) {

    var hasError = function(errors, str) {
      var found = false;
      for (key in errors) {
        if (!found && errors.hasOwnProperty(key) && errors[key].path == str) 
          found = true;        
      }
      return found;
    };

    console.error(err);
    if (!req || !res) return;
    if (o.redirect) {
      res.redirect(o.redirect);
      return;
    }

    if (err.errors && err.name === "ValidationError") {
      if (hasError(err.errors, "date")) showForm(err, req, res, o);
    }
  },

  showForm = function(err, req, res, o) {
    var t = req.body["event-title"],
      d = req.body["event-date"];
    if (!o.eventTitle) o.eventTitle = t ? t : '';
    if (!o.eventDate) o.eventDate = d ? d : '';
    o.err = err ? err : {};
    res.render("event_form", o);
  },

  saveEvent = function(o, callback) {
    var eventObj = {},
      regEx = { date: /^(\d{2})\/(\d{2})\/(\d{4})$/, space: /^\s*|\s*$/g },
      eventTitle = o.body["event-title"],
      rawDate = o.body["event-date"];

    if (rawDate && (rawDate = rawDate.replace(regEx.space, '')) ) {
      eventObj.date = regEx.date.test(rawDate) ? new Date(rawDate).toUTCString() : null;
    }

    if (eventTitle && eventTitle.trim()) {
      eventObj.title = eventTitle.trim();
    }

    if (typeof o.id === "undefined") {
      new Event(eventObj).save(callback);
      return;
    }

    Event.findById(o.id, function(err, result) {
      if (err) return handleError(err);
      if (eventObj.date || eventObj.date == null) result.date = eventObj.date;
      if (eventObj.title) result.title = eventObj.title;        
      result.save(callback);
    });

  };

exports.create_event = function(req, res) {

  var info = req.app.settings.pkginfo,
    method = req.method.toLowerCase(),
    options = {
        action: "create",
        className: "pg-add-event",
        appTitle: info.title,
        pageTitle: 'Add a New Event'
      };

  if (method === "get") {

    showForm(null, req, res, options);

  } else if (method === "post") {

    saveEvent({ body: req.body }, function(err, result) {
      if (err) {
        options.redirect = err.errors ? "" : "/events";
        return handleError(err, req, res, options);
      }
      res.redirect("/event/" + result._id);
      return;
    });

  }

};

exports.update_event = function(req, res, next) {

  var info = req.app.settings.pkginfo,
    method = req.method.toLowerCase(),
    options = {
        action: "update",
        appTitle: info.title,
        eventId: req.params.id,
        pageTitle: 'Update Event'
      };

  if (!req.params.id.match(objectIdRegEx)) return next();

  if (method === "get") {

    Event.findById(req.params.id, function(err, result) {
      if (err) return handleError(err, req, res, { redirect: "/events" });
      if (!result) return next();

      options.eventTitle = result.title;
      options.eventDate = moment(result.date).format("MM/DD/YYYY");
      showForm(null, req, res, options);
    });

  } else if (method === "put") {

    saveEvent({ id: options.eventId, body: req.body }, function(err, result) {
      if (err) {
        options.redirect = err.errors ? "" : "/events";
        return handleError(err, req, res, options);
      }
      res.redirect("/event/" + result._id);
      return;
    });

  }
};

exports.show_event = function(req, res, next) {

  var info = req.app.settings.pkginfo;

  if (!req.params.id.match(objectIdRegEx)) return next();

  Event.findById(req.params.id, function (err, result){
    if (err) return handleError(err);
    if (!result) return next();

    res.render("event", {
      appTitle: info.title,
      pageTitle: "Event Details",
      className: "pg-show-event",
      eventId: result._id,
      eventDate: moment(result.date).format("dddd, MMMM Do YYYY"),
      eventTitle: result.title
    });

  });

};

exports.list_events = function(req, res) {

  var info = req.app.settings.pkginfo;

  Event.find( function (err, result, count){
    res.render("events", {
      className: "pg-events",
      appTitle: info.title,
      pageTitle: 'List of Events',
      events: result
    });
  });

};

exports.destroy_event = function(req, res) {

  if (!req.params.id || !req.params.id.match(objectIdRegEx)) {
    res.redirect("back");
    return;
  }

  Event.remove(req.params.id, function(err, result) {
    if (err) handleError(err);
    res.redirect("/events");
    return;
  });

};









