const auth = require("../middleware/auth");
const { Note, validate } = require("../models/note");

const router = require("express").Router();

module.exports = router;

router.post("/", auth, async (req, res) => {
  const result = validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }
  let note = await Note.findOne({ title: req.body.title });
  if (note) {
    return res
      .status(400)
      .send("Note with this title already exists. Please add another title.");
  }
  note = new Note(req.body);
  await note.save();
  res.send(note);
});

router.put("/:id", auth, async (req, res) => {
  const result = validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }
  let note = await Note.findOne({ _id: req.params.id });
  if (!note) {
    return res.status(400).send("Could not find the note.");
  }
  if (req.title) {
    note.title = req.title;
  }
  if (req.description) {
    note.description = req.description;
  }
  if (req.coverImage) {
    note.coverImage = req.coverImage;
  }
  if (req.images) {
    note.images = req.images;
  }
  if (req.author) {
    note.author = req.author;
  }
  if (req.ecopies) {
    note.ecopies = req.ecopies;
  }
  await note.save();
  res.send(note);
});

router.delete("/:id", auth, async (req, res) => {
  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(400).send("Could not find the note.");
  }
  await note.delete();
  res.send("Note has been deleted.");
});

router.get("/:id", auth, async (req, res) => {
  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(400).send("Could not find the note.");
  }
  res.send(note);
});
router.get("/", auth, async (req, res) => {
  const notes = await Note.find();
  res.send(notes);
});
