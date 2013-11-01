
// write_stream.js
//
// Packt Publishing - Build a Network Application with Node
// Write a file as a stream

var fs = require("fs"),
  options = { flags: 'w', encoding: 'utf8', mode: 0666 },
  outFile = fs.createWriteStream("veggies.txt", options),

  writeStream = function(stream, callback) {

    var count = 0,
      dataArray = [ "squash", "celery", "cucumber" ];

    function writeChunk() {
      if (count >= dataArray.length) {
        stream.end();
        return;
      }
      buf = new Buffer(dataArray[count] + "\n", 'utf8');
      stream.write(buf, function() {
        count++;
        writeChunk();
      });
    };

    writeChunk();

    stream.on("finish", callback);
  };

writeStream(outFile, function() {
  console.log("Done writing file.");
});
