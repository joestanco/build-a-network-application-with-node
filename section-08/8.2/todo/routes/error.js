
// error.js
//
// Packt Publishing - Build a Network Application with Node
// GET error route

exports.report = function(req, res) {

  var msg = res.app.settings.errorMessage || "Internal server error.";

  res.render("error.ejs", { 
    "title": "2 Deux", 
    "msg": msg 
  });

}