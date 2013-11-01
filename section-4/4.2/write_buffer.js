
// write_parts.js
//
// Packt Publishing - Build a Network Application with Node
// Writing a file using a buffer

var fs = require('fs');

fs.open("veggies.txt", "w", 0666, function(err, fd) {
  if (err) return console.log(err);

  var totals = { "bytes": 0, "data": "" },
    dataArray = [ "squash", "celery", "cucumber" ],
    count = 0;

    writeChunk = function() {
      if (count >= dataArray.length) {
        fs.close(fd, function() {
          console.log("Buffer written: \n" + totals.data);
          console.log("Bytes written: " + totals.bytes);
        });
        return;
      }
      buf = new Buffer(dataArray[count] + "\n", 'utf8');
      fs.write(fd, buf, 0, buf.length, null, function(err, bytesWritten, buffer) {
        if (err) return console.log(err);
        totals.bytes += bytesWritten;
        totals.data += buffer.toString();
        count++;
        writeChunk();
      });
    };

  writeChunk();
});
