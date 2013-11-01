
// named_functions.js
//
// Packt Publishing - Build a Network Application with Node
// Contrived example to demonstrate problem with anonymous functions

var crop = {
  "fruits": [ "apple", "orange", "lemon" ],
  "harvest": function() { 
    return this.fruits;
  }
};

(function myFunc(){

  console.log(arguments[0]().length);

})(crop.harvest);
