
// client.js
//
// Packt Publishing - Build a Network Application with Node
// Basic web client

var http = require("http"),
  ansi = require("ansi"),
  cursor = ansi(process.stdout),
  
  makeRequest = function(h, p) {
    http.get({ host: h, path: p }, function(res) {
      var rgb, colors, 
        data = "";

      res.setEncoding("utf8");

      res.on("data", function(chunk) {
        data += chunk;
      });
      res.on("end", function() {

        colors = JSON.parse(data);
        colors.forEach(function(color) {
          // Extract RGB color from data item 
          rgb = color.rgb.substr(1, color.rgb.length-2).split(",");
          // Change color of terminal cursor
          cursor.rgb(rgb[0], rgb[1], rgb[2]);
          console.log(color.name);
        });

        cursor.reset();
      });
    })
    .on("error", function(err) {
      console.log(err);
    });
  };

// Load a JSON file of color data
// via: https://gist.github.com/jjdelc/1868136
makeRequest("pastebin.com", "/raw.php?i=FEx6M6Y2");
