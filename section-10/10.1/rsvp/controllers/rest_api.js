
// rest_api.js
//
// Packt Publishing - Build a Network Application with Node
// RESTful API for managing events

var models = require('../models/event.js'),
  Event = models.eventModel,
  moment = require("moment"),
  objectIdRegEx = /^[0-9a-fA-F]{24}$/,
  gravatar = require("gravatar"),

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
      if (hasError(err.errors, "email")) {
        req.session.err = err;
        res.redirect("/event/" + o.eventId);
        return;
      }
    }
  },

  getResponses = function(result) {
    var status, responseObj, responseLists = {};
    result.responses.forEach(function(response) {

      status = response.status.toLowerCase();
      responseObj = {
        _id: response._id,
        name: response.name,
        gravatar: gravatar.url(response.email, { s: '20', d: 'retro', r: 'g' })
      };

      if (typeof responseLists[status] === "undefined")
        responseLists[status] = [responseObj];
      else
        responseLists[status].push(responseObj);

    });
    return responseLists;
  }

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
      responseObj = {},
      regEx = { date: /^(\d{2})\/(\d{2})\/(\d{4})$/, space: /^\s*|\s*$/g },
      eventTitle = o.body["event-title"],
      rawDate = o.body["event-date"],
      responseName = o.body["response-name"],
      responseEmail = o.body["response-email"],
      responseStatus = o.body["response-status"];

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

      if (responseName) responseObj.name = responseName.trim();
      if (responseEmail) responseObj.email = responseEmail.toLowerCase().replace(regEx.space, '');
      if (responseStatus) responseObj.status = responseStatus;

      if (responseName || responseEmail || responseStatus) {
        result.responses.push(responseObj);
      } else {
        if (eventObj.date || eventObj.date == null) result.date = eventObj.date;
        if (eventObj.title) result.title = eventObj.title;        
      }
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

  var sessionError = {},
    info = req.app.settings.pkginfo;

  if (!req.params.id.match(objectIdRegEx)) return next();

  Event.findById(req.params.id, function (err, result){
    if (err) return handleError(err);
    if (!result) return next();

    if (req.session && req.session.err) {
      sessionError = req.session.err;
      req.session.err = null;
    }

    res.render("event", {
      appTitle: info.title,
      pageTitle: "Event Details",
      className: "pg-show-event",
      eventId: result._id,
      eventDate: moment(result.date).format("dddd, MMMM Do YYYY"),
      eventTitle: result.title,
      eventResponses: getResponses(result),
      statuses: models.responseSchema.path('status').enumValues,
      err: sessionError
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

exports.destroy_response = function(req, res) {

  if (!req.params.event_id || !req.params.response_id
      || !req.params.event_id.match(objectIdRegEx) 
      || !req.params.response_id.match(objectIdRegEx) ) {
    res.redirect("back");
    return;
  }

  Event.findById(req.params.event_id, function(err, result) {
    if (err) return handleError(err);

    result.responses.id(req.params.response_id).remove();
    result.save(function(err, result) {
      if (err) handleError(err);
      res.redirect("back");
      return;
    });
  });

};
