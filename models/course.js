const Joi = require("joi");
const mongoose = require("mongoose");

const schema = new mongoose.schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
  },
  description: {
    type: String,
    requried: true,
    minlength: 20,
  },
  author: {
    type: String,
  },
  coverImage: { type: String, required: true },
  images: { type: [] },
  ecopies: { type: [] },
});

const Course = new mongoose.model("Course", schema);

function validateCourse(course) {
  const schema = new Joi.object({
    name: Joi.string().min(5).required(),
    description: Joi.string().min(20).required(),
    author: Joi.string(),
    coverImage: Joi.string().require(),
    images: Joi.array(),
    ecopies: Joi.array(),
  });
  return schema.validate(course);
}

module.exports.Course = Course;
module.exports.validate = validateCourse;
