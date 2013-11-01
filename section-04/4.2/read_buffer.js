
// read_parts.js
//
// Packt Publishing - Build a Network Application with Node
// Reading a file using a buffer

var fs = require('fs');

fs.open("fruits.txt", "r", function(err, fd) {
  if (err) return console.log(err);

  var data = "",
    buf = new Buffer(20),

    readChunk = function() {
      fs.read(fd, buf, 0, buf.length, null, function(err, bytesRead, buffer) {
        if (err) return console.log(err);

        if (bytesRead == buf.length) {
          data += buffer.toString();
          readChunk();
        } else {
          if (bytesRead > 0) {
            data += buffer.slice(0, bytesRead).toString();
          }
          fs.close(fd, function() {
            console.log(data);
          });
        }
      });
    };

  readChunk();
});
