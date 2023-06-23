const express = require("express");
const pokemon = require("../models/pokemon");
const adoptedPokemons = require("../models/adoptedPokemons");
const { User } = require("../models/users");
const mongoose = require("mongoose");
const db = mongoose.connection;
// const { User } = require("../models/users");
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

router.get("/adoptedPokemons", async (req, res) => {
  try {
    const Adoptedpokemons = await adoptedPokemons.find();
    return res.json(Adoptedpokemons);
  } catch (error) {
    res.status(500).send({ msg: "Server Error" });
  }
});
// @route POST pokemon/myPokemons
// @description My interviews
// @acess PUBLIC

router.post("/myPokemons", async (req, res) => {
  try {
    // console.log("pooookemon");
    console.log("request body", req.body);
    const uid = req.body.uid;
    const userData = await User.findOne({ _id: uid });
    // console.log(userData);
    const myPokemons = userData.pokemonList;
    console.log(myPokemons);
    return res.json(myPokemons);
  } catch (error) {
    res.status(500).send({ msg: "Server Error" });
  }
});

router.post("/getMyPokemons", async (req, res) => {
  try {
    const id = req.body.currId;
    const result = await adoptedPokemons.findOne(
      { _id: id }
    )
    // console.log(result);
    return res.json(result)
  } catch (error) {
    console.log(error);
  }
  
});

router.put("/feed", async (req, res) => {
  try {
    const adoptId = req.body.currId;
    await adoptedPokemons.updateOne(
      { _id: adoptId },
      {
        $set: {
          isFeeded: true,
        },
      }
    )
    res.status(200).send({msg : "Feeded"})
  } catch (error) {
    console.log(error);
  }
})
// router.get("/:id", async (req, res) => {
//   try {
//     const data = await interview.findById(req.params.id);
//     return res.json(data);
//     // console.log(data);
//   } catch (error) {
//     console.log(error.msg);
//   }
// });

// @route POST /pokemon
// @description Add pokemon
// @acess PUBLIC
router.post("/", async (req, res) => {
  var { name, type, breed, age,  } = req.body;
  try {
    const newPokemon = new pokemon({
      name,
      type,
      breed,
      age,
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

router.post("/adopt", async (req, res) => {
  var { name, type, breed, age, healthStatus, uid } = req.body;
  try {
    
    const newAdoptedPokemons = new adoptedPokemons({
      name,
      type,
      breed,
      age,
      healthStatus,
    });
    // console.log(newAdoptedPokemon);
    const result = await newAdoptedPokemons.save();
     await User.updateOne(
          { _id: uid },
          {
            $push: {
              pokemonList: result._id,
            },
          }
        );
       
    console.log(result);
    return res.json({ msg: "Data Saved succesfully" });
    console.log("Pokemon Adopted Succesfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
});

module.exports = router;
