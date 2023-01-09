const auth = require("../middleware/auth");
const { Course, validate } = require("../models/course");

const router = require("express").Router();
module.exports = router;

router.post("/", auth, async (req, res) => {
  const result = validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }
  const course = new Course(req.body);
  await course.save();
  return res.send(course);
});

router.put("/:id", auth, async (req, res) => {
  const result = validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }
  let course = await Course.findById(req.params.id);
  if (!course) {
    return res.status(400).send("Course not found.");
  }

  if (req.body.name) course.name = req.body.name;
  if (req.body.description) course.description = req.body.description;
  if (req.body.author) course.author = req.body.author;
  if (req.body.coverImage) course.coverImage = req.body.coverImage;
  if (req.body.images) course.images = req.body.images;
  if (req.body.ecopies) course.ecopies = req.body.ecopies;
  await course.save();
  res.send(course);
});

router.get("/:id", auth, async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return res.status(400).send("Course not found");
  }
  res.send(course);
});

router.get("/", auth, async (req, res) => {
  res.send(await Course.find());
});

router.delete("/:id", auth, async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return res.status(400).send("Course not found");
  }
  await course.delete();
  res.send("Course has been deleted");
});
