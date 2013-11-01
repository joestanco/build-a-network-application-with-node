
// index.js
//
// Packt Publishing - Build a Network Application with Node
// GET home page.

exports.index = function(req, res){

  var info = req.app.settings.pkginfo;

  res.render('index', {
    className: "pg-home",
    appTitle: info.title,
    appDescription: info.description,
    pageTitle: 'Welcome to the Event RSVP Application'
  });

};