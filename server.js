const express = require("express");
const connectDB = require("./connectDB");
const cors = require("cors");
const authRoute = require("./Routes/auth");
const userRoutes = require("./Routes/userRoutes");
const feedStatus = require("./feedStatus");
const cron = require("node-cron");
const app = express();
const fun = async () => {
  await connectDB();
  // console.log("1234");
  // feedStatus();
}
fun();
cron.schedule('* * * * *', () => {
  console.log("helllo");
  feedStatus();
});
// cron.start();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoute);
app.use("/pokemon", require("./Routes/pokemonRoutes"));
app.listen(5000, () => {
  console.log("Server is Running");
});
