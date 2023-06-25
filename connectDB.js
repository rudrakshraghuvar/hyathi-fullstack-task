const mongoose = require("mongoose");
require("dotenv").config();

const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(
      db,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );

    console.log("DB connected...");
  } catch (err) {
    console.error(err.message);
    console.log("1111");
    //exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;