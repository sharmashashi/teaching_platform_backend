const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
  },
  description: {
    type: String,
    minlength: 20,
    required: true,
  },
  coverImage: { type: String, required: true },
  images: { type: [] },
  author: { type: String },
  ecopies: { type: [], required: true },
});
const Note = new mongoose.model("Note", schema);

function validateNote(note) {
  const schema = new Joi.object({
    title: Joi.string().min(5).required(),
    description: Joi.string().min(20).required(),
    coverImage: Joi.string().required(),
    images: Joi.array(),
    author: Joi.string(),
    ecopies: Joi.array().required(),
  });
  return schema.validate(note);
}

module.exports.Note = Note;
module.exports.validate = validateNote;
