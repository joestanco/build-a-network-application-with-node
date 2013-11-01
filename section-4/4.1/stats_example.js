
// stats_example.js
//
// Packt Publishing - Build a Network Application with Node
// Getting file and directory metadata

var fs = require("fs"),
util = require("util");

fs.stat("img", function(err, dirStats) {
  
  if (err) return console.log(err);

  if (dirStats.isDirectory()) {

    console.log("Directory last modified : " + dirStats.mtime + "\n");

    fs.stat("img/packt_logo.png", function(err, fileStats) {

      if (err) return console.log(err);

      if (fileStats.isFile()) {
      	console.log("File size: " + fileStats.size + " bytes\n");
      	console.log(util.inspect(fileStats));
      }

    });

  }

});