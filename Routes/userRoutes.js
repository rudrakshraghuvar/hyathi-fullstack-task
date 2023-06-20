const router = require("express").Router();
const { User } = require("../models/users");
const bcrypt = require("bcrypt");
router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      alert("User already exis");
      return res.status(409).send({ message: "User already exist" });
    }
    const salt = bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    await new User({ ...req.body, password: hashPassword }).save();
    console.log(req.body);
    res.status(201).send({ message: "User created successfully." });
    console.log("Registration Successfull");
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    return res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Server Error" });
  }
});

module.exports = router;
