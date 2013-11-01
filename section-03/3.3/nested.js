
// nested.js
//
// Packt Publishing - Build a Network Application with Node
// An example with many nested callbacks

var fs = require('fs'),

  textToJson = function(inFile, outFile, callback) {
    fs.stat(outFile, function(err, stats) {

      if (typeof stats !== "undefined") {
        return callback( new Error(outFile + " already exists.") );
      }

      fs.readFile(inFile, function(err, textData) {

        if (err) return callback(err);

        var listText = textData.toString().split("\n"),
          listJson = JSON.stringify(listText);

        fs.writeFile(outFile, listJson, function(err) {

          if (err) return callback(err);

          callback(null, listJson);

        });
      });
    });
  };

textToJson('./fruits.txt', './fruits.json', function(err, result) {
  if (err) {
    console.log(err);
    return false;
  }
  console.log("JSON file created!\n" + result);
});