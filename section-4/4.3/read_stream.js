
// read_stream.js
//
// Packt Publishing - Build a Network Application with Node
// Read a file as a stream

var fs = require("fs"),

  inputFile = fs.createReadStream("fruits.txt"),

  readStream = function(stream, callback) {

    var data = '';

    function readChunk() {
      var chunk = stream.read();
      while (chunk !== null) {
        data += chunk.toString();
        chunk = stream.read();
      }
    };

    stream.on("readable", readChunk);
    stream.on("end", function() {
      callback(data);
    });
  };

readStream(inputFile, function (data) {
  console.log(data);
});
