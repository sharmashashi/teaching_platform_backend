const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.schema({
  userId: {
    type: String,
    required: true,
  },
  courses: {
    type: [],
    required: true,
    minlength: 1,
  },
  experiences: {
    type: [],
  },
  title: {
    type: String,
    required: true,
  },
});

const Teacher = new mongoose.model("Teacher", schema);

function validateTeacher(teacher) {
  const schema = new Joi.object({
    userId: Joi.string().required(),
    courses: Joi.array().min(1).required(),
    experiences: Joi.array(),
    title: Joi.string().required(),
  });
  return schema.validate(teacher);
}

module.exports.Teacher = Teacher;
module.exports.validate = validateTeacher;
