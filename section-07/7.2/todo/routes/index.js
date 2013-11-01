
// index.js
//
// Packt Publishing - Build a Network Application with Node
// GET homepage route

exports.index = function(req, res){

  var welcomeMsg = "Welcome";

  if (req.session.visited) {
    welcomeMsg = "Welcome back!";
  } else {
    req.session.visited = true;
  }
  
  res.send("<h1>2 Deux</h1>\
            <p>A todo app in Express</p>\
            <h3>" + welcomeMsg + "</h3>");
  
};