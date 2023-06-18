const express = require("express");
const connectDB = require("./connectDB");
const app = express();
connectDB();
app.listen(5000, () => {
    console.log("Server is Running");
});
