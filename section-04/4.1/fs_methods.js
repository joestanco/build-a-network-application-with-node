
// fs_methods.js
//
// Packt Publishing - Build a Network Application with Node
// Demonstrating other methods from the file system module

var fs = require("fs"), 
  path = require("path"),

  logStuff = function() {
    fs.exists("log", function(exists) {
      if (exists) return;

      fs.mkdir("log", 0666, function(err) {
        console.log("\nCreated directory ./log");

        fs.rename("log", "logs", function(err) {
          console.log("Renamed directory ./log to ./logs");

          fs.rmdir("logs", function(err) {
            console.log("Removed directory ./logs\n");
          });
        });
      });
    });
  };

fs.exists("img", function(exists) {
  if (!exists) return;

  fs.readdir("img", function(err, files) {
    files.forEach(function(file) {
      fs.stat(path.join("img", file), function(err, stats) {
        console.log(file + ": " + stats.size + " bytes");
      });
    });
    logStuff();
  });
});




