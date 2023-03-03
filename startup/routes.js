const error = require("../middleware/error");
const express = require("express");
const users = require("../routes/users");
const auth = require("../routes/auth");
const addresses = require("../routes/addresses");
const devices = require("../routes/devices");
const notes = require("../routes/notes");
const students = require("../routes/students");
const courses = require("../routes/courses");
const teachers = require("../routes/teachers");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/addresses", addresses);
  app.use("/api/devices", devices);
  app.use("/api/notes", notes);
  app.use("/api/students", students);
  app.use("/api/courses", courses);
  app.use("/api/teachers", teachers);
  app.use(error);
};
