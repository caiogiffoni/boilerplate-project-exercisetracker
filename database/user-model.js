const mongoose = require("mongoose");

const { Schema } = mongoose;
const ObjectID = Schema.ObjectID;

const UserSchema = new Schema({
  username: String, // String is shorthand for {type: String}
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
