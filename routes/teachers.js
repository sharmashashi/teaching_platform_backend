const auth = require("../middleware/auth");
const { Teacher, validate } = require("../models/teacher");

const router = require("express").Router();
module.exports = router;

router.post("/", auth, async (req, res) => {
  req.body.userId = req.user._id;
  const result = validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  let teacher = await Teacher.findOne({ userId: req.body.userId });
  if (teacher) {
    return res.status(400).send("Teacher already exists.");
  }
  teacher = new Teacher(req.body);
  await teacher.save();
  res.send(teacher);
});

router.put("/:id", auth, async (req, res) => {
  req.body.userId = req.user._id;
  const result = validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  let teacher = await Teacher.findOne({userId:req.params.id});
  if (!teacher) {
    return res.status(400).send("Could not find teacher.");
  }
  const body = req.body;
  if (body.courses) teacher.courses = body.courses;
  if (body.experiences) teacher.experiences = body.experiences;
  if (body.title) teacher.title = body.title;
  await teacher.save();
  res.send(teacher);
});

router.get("/:id", auth, async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);
  if (!teacher) {
    return res.status(400).send("Could not find teacher.");
  }
  res.send(teacher);
});

router.get("/", auth, async (req, res) => {
  const results = await Teacher.find();
  res.send(results);
});
