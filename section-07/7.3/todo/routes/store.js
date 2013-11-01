
// store.js
//
// Packt Publishing - Build a Network Application with Node
// POST save todo item

exports.save = function(req, res){

  var session = req.session,
    newItem = req.body['todo-item'];

  if (session && newItem) {
    if (session.todos) {
      session.todos.push(newItem);
    } else {
      session.todos = [ newItem ];
    }
  }

  res.redirect("back");

};