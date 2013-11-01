
// emitter.js
//
// Packt Publishing - Build a Network Application with Node
// Read the contents of a file asynchronously

var fs = require('fs');

fs.readFile('cities', 'utf8', function(err, cities) {

  if (err) {
    console.log(err);
    return;
  }

  console.log(cities);
});
