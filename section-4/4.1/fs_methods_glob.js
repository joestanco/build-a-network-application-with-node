
// fs_methods_glob.js
//
// Packt Publishing - Build a Network Application with Node
// Use the glob module to match files using patterns

var fs = require("fs"), 
  path = require("path"),
  glob = require("glob");

glob("img/*.png", function (err, files) {

  files.forEach(function(filename) {

    fs.stat(filename, function(err, stats) {
      console.log(path.basename(filename) + ": " + stats.size + " bytes");
    });

  });

});


