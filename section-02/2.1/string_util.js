// string_util.js
//
// Packt Publishing - Build a Network Application with Node
// String Utility Module 

var version = "1.0";
myGlobal = "shared";
global.myNamespace = { myProp: "myValue" };

/**
  String Utility
  @constructor
*/
var StringUtil = function() {

  this.version = version;

  /**
    Reverses a string
    @param {string} s The string to reverse.
  */
  this.reverse = function(s) {
    var outStr = [],
      len = s.length-1,
      halfLen = parseInt(len/2);
    for (i=0; i <= halfLen; i++) {
      outStr[i] = s[len-i];
      outStr[len-i] = s[i];
    }
    return outStr.join("");
  };
  return this;
};

module.exports = new StringUtil();
