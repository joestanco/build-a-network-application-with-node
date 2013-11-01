
// parse_json.js
//
// Packt Publishing - Build a Network Application with Node
// Catch a parse error in a JSON file

var fs = require('fs');

var getJson = function(jsonFile, callback) {

  fs.readFile(jsonFile, function (err, rawData) {
    var parsedData;
    if (err) {
      return callback(err);
    }
    try {
      parsedData = JSON.parse(rawData.toString());
    }
    catch (e) {
      return callback(e);
    }
    return callback(null, parsedData);
  });

};

getJson("./demo.json", function(err, data) {

  if (err) {
    console.log(err);
    return;
  }
  console.log(data);

});
