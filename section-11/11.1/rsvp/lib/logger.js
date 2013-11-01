
var isTestEnv = (process.env.NODE_ENV == "test");

module.exports.log = function(msg) {
  if (isTestEnv) return;
  console.log(msg);
};

module.exports.err = function(msg) {
  if (isTestEnv) return;
  console.error(msg);
};