
// module_identifiers.js
//
// Packt Publishing - Build a Network Application with Node
// Different methods for loading modules

// Load a core module 
var cluster = require("cluster");

// Load a file in the current directory
var fibonacci = require("./fibonacci");

// Load a file one level above the current directory
var reverse = require("../reverse");

// Load a file at an absolute path
var app = require("/opt/local/www/server.js");

// Load a file from "node_modules"
// This example resolves to "./node_modules/someUtil.js"
var someUtil = require("someUtil"); 

// Load a module with package.json
// This resolves to "./lib/cool-library.js"
var myLibrary = require("myLibrary");

// Load a folder
// This module resolves to "./node_modules/stringUtilities/index.js"
var stringUtilities = require("stringUtilities") 

if (require.main === module) {
  console.log("This file is being run directly by node.");
}

