const auth = require("../middleware/auth");
const { Student, validate } = require("../models/student");

const router = require("express").Router();
module.exports = router;

router.post("/", auth, async (req, res) => {
  req.body.userId = req.user._id;
  const result = validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  let student = await Student.findOne({ userId: req.body.userId });
  if (student) {
    return res.status(400).send("Student already exists.");
  }
  student = new Student(req.body);
  await student.save();
  res.send(student);
});

router.put("/:id", auth, async (req, res) => {
  req.body.userId = req.user._id;
  const result = validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  let student = await Student.findById(req.params.id);
  if (!student) {
    return res.status(400).send("Could not find student.");
  }
  if (req.body.dob) student.dob = req.body.dob;
  if (req.body.school) student.school = req.body.school;
  if (req.body.grade) student.grade = req.body.grade;
  await student.save();
  res.send(student);
});

router.get("/:id", auth, async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    return res.status(400).send("Could not find student.");
  }
  res.send(student);
});

router.get("/", auth, async (req, res) => {
  const results = await Student.find();
  res.send(results);
});
