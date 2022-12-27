const express = require("express");
const app = express();
const cors = require("cors");
const Loaders = require("./database/mongodb");
const UserModel = require("./database/model");
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

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
