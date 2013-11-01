
// stdio.js
//
// Packt Publishing - Build a Network Application with Node
// Read from stdin and write to stdout

process.stdin.setEncoding('utf8');

var readStream = function(stream, callback) {

    function readChunk() {
      process.stdout.write("\n");
      var chunk = stream.read();
      while (chunk !== null) {
        process.stdout.write(chunk.toString());
        chunk = stream.read();
      }
    };

    stream.on("readable", readChunk);
    stream.on("end", callback);
  };

readStream(process.stdin, function () {
  console.log("\n", "Done writing to STDOUT.\n");
});
