const mongoose = require("mongoose");

const { Schema } = mongoose;
const ObjectID = Schema.ObjectID;

const ExerciseSchema = new Schema(
  {
    username: String,
    description: String,
    duration: Number,
    date: String,
  },
  {
    versionKey: false, // You should be aware of the outcome after set to false
  }
);

const ExerciseModel = mongoose.model("exercises", ExerciseSchema);

module.exports = ExerciseModel;
