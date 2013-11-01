
// asynchronous.js
//
// Packt Publishing - Build a Network Application with Node
// Read the contents of a file asynchronously

var fs = require('fs');

fs.readFile('cities', 'utf8', function(err, cities) {
  console.log(cities);
});
  
console.log("Test message\n");
