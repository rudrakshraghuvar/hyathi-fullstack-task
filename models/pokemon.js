const mongoose = require("mongoose");

const PokemonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
  },
  age: {
    type: String,
    required: true,
  },
  healthStatus: {
    type: String,
    required: true,
  },
});

module.exports = Pokemon = mongoose.model("pokemon", PokemonSchema);
