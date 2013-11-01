
// fully_buffered_io.js
//
// Packt Publishing - Build a Network Application with Node
// An example using smaller functions to avoid nested callbacks

var fs = require('fs'),

  checkFile = function(outFile, callback) {
    fs.stat(outFile, function(err, stats) {
      callback(null, stats);
    });
  },

  convertFileData = function(outFile, inFile, callback) {
    fs.readFile(inFile, { encoding: "utf8" }, function(err, textData) {
      if (err) return callback(err);
      var listText = textData.toString().split("\n"),
        listJson = JSON.stringify(listText);
      writeJson(outFile, listJson, callback);
    });    
  },

  writeJson = function(outFile, jsonData, callback) {
    fs.writeFile(outFile, jsonData, { encoding: "utf8" }, function(err) {
      if (err) return callback(err);
      callback(null, jsonData);
    });
  },

  textToJson = function(inFile, outFile, callback) {
    checkFile(outFile, function(err, stats) {
      if (typeof stats !== "undefined")
        return callback( new Error(outFile + " already exists.") );
      convertFileData(outFile, inFile, callback);
    });
  };

textToJson('./fruits.txt', './fruits.json', function(err, result) {
  if (err) {
    console.log(err);
    return false;
  }
  console.log("JSON file created!\n" + result);
});
