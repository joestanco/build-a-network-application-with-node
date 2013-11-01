
// ready_example.js
//
// Packt Publishing - Build a Network Application with Node
// Waiting for a module to be ready

var delayedModule = require("./delayed_module");

delayedModule.on("ready", function() {
  console.log(delayedModule.message);
});