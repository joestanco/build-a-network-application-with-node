
// listener.js
//
// Packt Publishing - Build a Network Application with Node
// A simple module to listen to events

var song = require("./emitter"),

  restoreOrder = function() {
    console.log("Keep calm and carry on...");
  };

song.addListener("start", function() {
  console.log("Put on mask.");
});

song.addListener("stop", restoreOrder);

song.on("drop", function(message) {
  console.log(message);
  song.removeListener("stop", restoreOrder);
});

song.play();
