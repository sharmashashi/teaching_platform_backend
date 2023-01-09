const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  school: {
    type: String,
  },
  grade: {
    type: String,
  },
});

const Student = new mongoose.model("Student", schema);

function validateStudent(student) {
  const schema = new Joi.object({
    userId:Joi.string().required(),
    dob: Joi.date().required(),
    school: Joi.string(),
    grade: Joi.string(),
  });
  return schema.validate(student);
}

module.exports.Student = Student;
module.exports.validate = validateStudent;
