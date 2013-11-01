
// callback.js
//
// Packt Publishing - Build a Network Application with Node
// Example demonstrating a simple callback

var num, startTime, endTime, elapsed,

  fibCalculator = function(n, callback) {
    var fib = function(n){
      if (n > 2) {
        return fib(n - 2) + fib(n - 1);
      } else {
        return 1;
      }
    };
    callback(fib(n));
  };

startTime = new Date().getTime();
num = 42;

fibCalculator(num, function(result) {
  endTime = new Date().getTime();
  elapsed = endTime - startTime;
  console.log("Fibonacci result " + result + " for " + num + " calculated after " + elapsed + " ms\n");
});

console.log("Calculation complete");
