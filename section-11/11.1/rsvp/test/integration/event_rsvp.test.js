
process.env.NODE_ENV = "test";

var eventRSVP = require("../../app")
  , db = eventRSVP.db
  , conn = null

  // Clear all Test DB collections
  , clearCollections = function(done) {
    for (var c in conn.collections) {
      conn.collections[c].remove(function(err) {
        if (err) throw err;
      });
    }
    done();
  }

  // On first run, get Test DB connection before clearing collections
  , resetDatabase = function(done) {

    if (conn) return clearCollections(done);

    db.on("connected", function(connection) {
      conn = connection;
      clearCollections(done);
    });
  };

/* Test suite for managing events */
describe("Manage Events", function(){

  beforeEach(resetDatabase);

  it("should create an event", function(done) { done(); });

  it("should create an event with a default date", function(done) { done(); });

  it("should error when creating an event with a past date", function(done) { done(); });

  it("should update an event", function(done) { done(); });

  it("should delete an event", function(done) { done(); });

  it("should show 404 page for invalid event", function(done) { done(); });

});


/* Test suite for managing event responses */
describe("Manage Event Responses", function(){

  beforeEach(resetDatabase);

  it("should add a response to an event", function(done) { done(); });

  it("should require valid status for event response", function(done) { done(); });

  it("should require valid email for event response", function(done) { done(); });

  it("should delete an event response", function(done) { done(); });

});

