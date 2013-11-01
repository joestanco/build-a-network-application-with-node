
// index.js
//
// Packt Publishing - Build a Network Application with Node
// GET homepage route

exports.index = function(req, res){

  throw new Error("Oops...");

  var todoList = "",
    todoHTML = "<em>No tasks to display</em>", 
    session = req.session; 

  if (session && session.todos && session.todos.length) {
    session.todos.forEach(function(todo) {
      todoList += "<li>" + todo + "</li>";
    });
    todoHTML = "<ul>" + todoList + "</ul>";      
  }

  var html = "<h1>2 Deux</h1>\
              <p>A todo app in Express</p>\
              <form action='/save' method='post'>\
                <label for='todo-item'>Enter a task: </label>\
                <input type='text' id='todo-item' name='todo-item' placeholder='new todo' />\
                <input type='submit' value='Save' />\
              </form>\
              <p>" + todoHTML + "</p>";

  res.send(html);
  
};