
// index.js
//
// Packt Publishing - Build a Network Application with Node
// GET homepage route

exports.index = function(req, res){

  var session = req.session,
    todos = session && session.todos && session.todos.length ? session.todos : null;

  res.render("index.ejs", {
    "title": "2 Deux",
    "description": "A todo app in Express",
    "todos": todos
  });
  
};