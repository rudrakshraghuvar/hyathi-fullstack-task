const express = require("express");
const pokemon = require("../models/pokemon");
const mongoose = require("mongoose");
const db = mongoose.connection;
const { User } = require("../models/users");
const router = express.Router();


// @route GET /interview
// @description All interviews
// @acess PUBLIC
router.get("/", async (req, res) => {
  try {
    const Allpokemons = await pokemon.find();
    return res.json(Allpokemons);
  } catch (error) {
    res.status(500).send({ msg: "Server Error" });
  }
});

// router.get("/:id", async (req, res) => {
//   try {
//     const data = await interview.findById(req.params.id);
//     return res.json(data);
//     // console.log(data);
//   } catch (error) {
//     console.log(error.msg);
//   }
// });

// @route POST /interview
// @description Add interview
// @acess PUBLIC
router.post("/", async (req, res) => {
  var { name, type, breed, age, healthStatus } = req.body;
  try {
    const newPokemon = new pokemon({
      name,
      type,
      breed,
      age,
      healthStatus,
    });
    console.log(newPokemon);
    await newPokemon.save();

    return res.json({ msg: "Data Saved succesfully" });
    console.log("Data Saved succesfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
});

// @route PUT /interview
// @description Remove interview
// @acess PUBLIC
// router.put("/:id", async (req, res) => {
//   const id = req.params.id;
//   console.log(id);
//   try {
//     await Interview.deleteOne({ _id: id });
//     console.log("hello");
//   } catch (error) {
//     console.log(error);
//   }
// });

// @route PUT /interview/edit/:id
// @description Edit interview
// @acess PUBLIC
//  title,
//    sDate,
//    eDate,
//    candidate,
//    interviewer,
// router.put("/edit/:id", async (req, res) => {
//   const id = req.params.id;
//   const data = req.body;
//   console.log(data);
//   try {
//     await Interview.updateOne(
//       { _id: id },
//       {
//         $set: {
//           title: data.title,
//           sDate: data.sDate,
//           eDate: data.eDate,
//           candidate: data.candidate,
//           interviewer: data.interviewer,
//         },
//       }
//     );
//     return res.status(200).send("Upadted Successfully");
//   } catch (error) {
//     console.log(error);
//   }
// });

module.exports = router;
