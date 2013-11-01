
// synchronous.js
//
// Packt Publishing - Build a Network Application with Node
// Read the contents of a file synchronously

var fs = require('fs');
 
console.log(fs.readFileSync('./cities', 'utf8'));
 
console.log("\nTest message");
