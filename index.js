const express = require("express");
const app = express();
const cors = require("cors");
const Loaders = require("./database/mongodb");
const UserModel = require("./database/user-model");
const ExerciseModel = require("./database/exercise-model");
require("dotenv").config();
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/api/users", async (req, res) => {
  const { username } = req.body;
  const user = await UserModel.create({ username: username });
  return res.json({ username: user.username, _id: user._id });
});

app.get("/api/users", async (req, res) => {
  const users = await UserModel.find();
  return res.json(users);
});

app.post("/api/users/:_id/exercises", async (req, res) => {
  console.log(req.body);
  const { _id, description, duration, date } = req.body;
  const user = await UserModel.findById(_id);
  console.log(user);
  return res.json("{ username: user.username, _id: user._id }");
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
