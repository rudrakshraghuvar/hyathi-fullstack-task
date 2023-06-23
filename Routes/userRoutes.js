const router = require("express").Router();
const mongoose = require("mongoose");
const pokemon = require("../models/pokemon");
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

router.put("/", async (req, res) => {
  // var pid = req.params.id;
  const { uid, pid } = req.body;
  console.log(pid, uid);
  console.log("hi");
  try {
    const pmid = new mongoose.Types.ObjectId(pid);
    console.log(pmid);
    const doc = await User.findOne({
      pokemonList: pmid,
    });
    if (doc) {
      console.log("Exists");
      return res.status(400).send("Already Exists");
    } else {
      try {
        await User.updateOne(
          { _id: uid },
          {
            $push: {
              pokemonList: pmid,
            },
          }
        );
        return res.status(200).send("Added Successfully");
      } catch (error) {
        console.log(error);
      }
    }
    // User.find((err, doc) => {
    //   if (err)
    //     console.log(err);
    //   else {
    //     const plist = doc.pokemonList;
    //     console.log(plist);
    //   }
    // })
  } catch (err) {
    console.log(err);
  }
  // console.log(User);
  // const res = await User.pokemonList.findById(pmid);
  // if (red.length > 0) {
  //   return res.status(400).send("Already Exists");
  // else
  // {
  //
  // catch (error) {
  // }
});

module.exports = router;
