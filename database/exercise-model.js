const mongoose = require("mongoose");

const { Schema } = mongoose;
const ObjectID = Schema.ObjectID;

const ExerciseSchema = new Schema({
  username: String,
  description: String,
  duration: String,
  date: Date,
});

const ExerciseModel = mongoose.model("exercises", ExerciseSchema);

module.exports = ExerciseModel;
