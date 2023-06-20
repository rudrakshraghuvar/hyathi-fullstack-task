const express = require("express");
const connectDB = require("./connectDB");
const cors = require("cors");
const userRoutes = require("./Routes/userRoutes");
const app = express();
const authRoutes = require("./Routes/auth");
connectDB();
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/pokemon", require("./Routes/pokemonRoutes"));
app.listen(5000, () => {
    console.log("Server is Running");
});