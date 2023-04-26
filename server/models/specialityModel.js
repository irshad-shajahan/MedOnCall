const mongoose = require("mongoose");

const specialitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Speciality name is required"],
    unique: true
  }
});

const specialityModel = mongoose.model("speciality", specialitySchema);
module.exports = specialityModel;
