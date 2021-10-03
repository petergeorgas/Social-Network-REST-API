const supertest = require("supertest");
const app = require("./app");
const user = require("./models/user");
require("dotenv").config;

process.env.NODE_ENV = "test";

req = supertest(app);

describe("Our API", () => {
  it("Should respond with a JWT when we POST to /api/auth/register properly", (done) => {
    req
      .post("/api/auth/register")
      .set("Content-Type", "application/json")
      .send({
        firstName: "John",
        lastName: "Doe",
        email: "jdoe@gmail.com",
        dob: "2000-07-05",
        pass: "testpass123",
      })
      .expect(200, (err, res) => {
        if (err) {
          return done(err);
        }
        if (res.body.token) {
          done();
        } else {
          done("No token returned.");
        }
      });
  });

  it("Should not permit a duplicate entry to be POSTed to /api/auth/register", (done) => {
    req
      .post("/api/auth/register")
      .set("Content-Type", "application/json")
      .send({
        firstName: "John",
        lastName: "Doe",
        email: "jdoe@gmail.com",
        dob: "2000-07-05",
        pass: "testpass123",
      })
      .expect(500, (err, res) => {
        if (err) {
          return done(err);
        }
        if (!res.body.token) {
          done();
        } else {
          done("Token returned when it wasn't supposed to.");
        }
      });
  });

  it("Should not permit POSTing to /api/auth/register without an email", (done) => {
    req
      .post("/api/auth/register")
      .set("Content-Type", "application/json")
      .send({
        firstName: "John",
        lastName: "Doe",
        dob: "2000-07-06",
        pass: "testpass123",
      })
      .expect(500, (err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it("Should not permit POSTing to /api/auth/register without a first name", (done) => {
    req
      .post("/api/auth/register")
      .set("Content-Type", "application/json")
      .send({
        lastName: "Doe",
        email: "jdoe@gmail.com",
        dob: "2000-07-05",
        pass: "testpass123",
      })
      .expect(500, (err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it("Should not permit POSTing to /api/auth/register without a last name", (done) => {
    req
      .post("/api/auth/register")
      .set("Content-Type", "application/json")
      .send({
        firstName: "John",
        email: "jdoe@gmail.com",
        dob: "2000-07-05",
        pass: "testpass123",
      })
      .expect(500, (err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });
});
