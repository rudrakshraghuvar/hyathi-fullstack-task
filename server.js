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
cron.schedule('0 0 * * *', () => {
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

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

