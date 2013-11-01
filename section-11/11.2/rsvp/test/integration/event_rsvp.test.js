
process.env.NODE_ENV = "test";

var request = require("supertest")
  , Event = require("../../models/event").eventModel
  , eventRSVP = require("../../app")
  , app = eventRSVP.app
  , db = eventRSVP.db
  , conn = null
  , fixtures = {}
  , currYear = new Date().getFullYear()
  , nextYearStr = "01/01/"+(currYear+1)
  , lastYearStr = "01/01/"+(currYear-1)

  // Clear all Test DB collections
  , clearCollections = function(done) {
    for (var c in conn.collections) {
      conn.collections[c].remove(function(err) {
        if (err) throw err;
      });
    }
    done();
  }

  // Reset fixture data before each run
  , resetFixtures = function() {
    fixtures.eventModel = {
      title: "Test Event",
      date: new Date(nextYearStr).toUTCString()
    };
    fixtures.eventBody = {
      "event-title": fixtures.eventModel.title,
      "event-date": nextYearStr
    };
    fixtures.responseModel = {
      name: "Foo Bar",
      email: "foo@bar.com",
      status: "Yes"
    };
    fixtures.responseBody = {
      "response-name": fixtures.responseModel.name,
      "response-email": fixtures.responseModel.email,
      "response-status": fixtures.responseModel.status 
    };
  }

  // On first run, get Test DB connection before clearing collections
  , resetDatabase = function(done) {

    resetFixtures();
    if (conn) return clearCollections(done);

    db.on("connected", function(connection) {
      conn = connection;
      clearCollections(done);
    });
  };

/* Test suite for managing events */
describe("Manage Events", function(){

  beforeEach(resetDatabase);

  it("should create an event", function(done) {

    request(app)
      .post("/event/create")
      .send(fixtures.eventBody)
    .end(function(err, res){

      res.should.have.status(302);
      Event.find(function(err, result) {

        result.length.should.equal(1);
        result[0].title.should.equal(fixtures.eventModel.title);
        result[0].date.toUTCString().should.include(fixtures.eventModel.date);
        done();

      });
      
    });

  });

  it("should create an event with a default date", function(done) {

    fixtures.eventBody["event-date"] = "";

    request(app)
      .post("/event/create")
      .send(fixtures.eventBody)
    .end(function(err, res){

      res.should.have.status(302);
      Event.find(function(err, result) {

        result.length.should.equal(1);
        result[0].title.should.equal(fixtures.eventModel.title);
        result[0].date.getTime().should.be.below(new Date().getTime());          
        done();

      });

    });

  });

  it("should error when creating an event with a past date", function(done) {

    fixtures.eventBody["event-date"] = lastYearStr;

    request(app)
      .post("/event/create")
      .send(fixtures.eventBody)
    .end(function(err, res) {

      res.should.have.status(500);
      done();      

    });

  });

  it("should update an event", function(done) {

    var newDateStr = "01/01/"+(currYear+2),
      newUTCDateStr = new Date(newDateStr).toUTCString();

    new Event(fixtures.eventModel).save(function(err, result) {

      fixtures.eventBody["event-title"] = "Foo Event";
      fixtures.eventBody["event-date"] = newDateStr;

      request(app)
        .put("/event/update/"+result.id)
        .send(fixtures.eventBody)
      .end(function(err, res){

        res.should.have.status(302);
        Event.findById(result.id, function(err, updatedResult) {

          updatedResult.title.should.equal(fixtures.eventBody["event-title"]);
          updatedResult.date.toUTCString().should.include(newUTCDateStr);
          done();

        });

      });

    });

  });

  it("should delete an event", function(done) {

    new Event(fixtures.eventModel).save(function(err, result) {

      request(app)
        .get("/event/destroy/"+result.id)
      .end(function(err, res){

        res.should.have.status(302);
        Event.find(function(err, result) {

          result.length.should.equal(0);
          done();

        });

      });

    });

  });

  it("should show 404 page for invalid event", function(done) {

    request(app)
      .get("/event/foo")
      .expect(404)
    .end(function(err, res) {

      res.should.have.status(200);
      done();

    });

  });

});


/* Test suite for managing event responses */
describe("Manage Event Responses", function(){

  beforeEach(resetDatabase);

  it("should add a response to an event", function(done) {

    new Event(fixtures.eventModel).save(function(err, result) {

      request(app)
        .put("/response/create/"+result.id)
        .send(fixtures.responseBody)
      .end(function(err, res){

        res.should.have.status(302);
        Event.findById(result.id, function(err, updatedResult) {

          var r = updatedResult.responses;
          r.length.should.equal(1);
          r[0].name.should.equal(fixtures.responseBody["response-name"]);
          r[0].email.should.equal(fixtures.responseBody["response-email"]);
          r[0].status.should.equal(fixtures.responseBody["response-status"]);
          done();

        });

      });

    });

  });

  it("should require valid status for event response", function(done) {

    new Event(fixtures.eventModel).save(function(err, result) {

      fixtures.eventBody["event-status"] = "foo";

      request(app)
        .put("/response/create/"+result.id)
        .send(fixtures.eventBody)
      .end(function(err, res){

        res.should.have.status(302);
        Event.findById(result.id, function(err, updatedResult) {
          updatedResult.responses.length.should.equal(0);
          done();
        });

      });

    });

  });

  it("should require valid email for event response", function(done) {

    new Event(fixtures.eventModel).save(function(err, result) {

      fixtures.responseBody["response-email"] = "chiocciola@ti@amo@troppo.com";

      request(app)
        .put("/response/create/"+result.id)
        .send(fixtures.responseBody)
      .end(function(err, res){

        res.should.have.status(302);
        Event.findById(result.id, function(err, updatedResult) {
          updatedResult.responses.length.should.equal(0);
          done();
        });

      });

    });

  });

  it("should delete an event response", function(done) {

    fixtures.eventModel.responses = [ fixtures.responseModel ];

    new Event(fixtures.eventModel).save(function(err, result) {

      request(app)
        .get("/response/destroy/"+result.id+"/"+result.responses[0].id)
      .end(function(err, res) {

        res.should.have.status(302);
        Event.findById(result.id, function(err, updatedResult) {
          updatedResult.responses.length.should.equal(0);
          done();
        });

      });

    });

  });

});

