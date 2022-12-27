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
  return res.json(user);
});

app.get("/api/users", async (req, res) => {
  const users = await UserModel.find();
  return res.json(users);
});

app.post("/api/users/:_id/exercises", async (req, res) => {
  const { id, description, duration, date } = req.body;
  const insertDate = date ? new Date(date) : new Date();
  const user = await UserModel.findById({ _id: id });
  const exercise = await ExerciseModel.create({
    username: user.username,
    description,
    duration,
    date: insertDate.toDateString(),
  });
  return res.json(exercise);
});

app.get("/api/users/:id/exercises", async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById({ _id: id });
  const exercises = await ExerciseModel.find({ username: user.username });
  return res.json(exercises);
});

app.get("/api/users/:id/exercises/logs", async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById({ _id: id });
  const exercises = await ExerciseModel.find({ username: user.username });
  return res.json({
    _id: user.id,
    username: user.username,
    count: exercises.length,
    logs: exercises,
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
