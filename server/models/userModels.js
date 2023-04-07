const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  phone: {
    type: Number,
    // required:[true, 'phone is required']
  },
  email: {
    type: String,
  },
  profilePhoto:{
    type:String
  },
  password: {
    type: String,
    // required:[true,'password is required']       
  },
  isDoctor:{
    type:Boolean
    }
});

const userModel = mongoose.model("users", userschema);
module.exports = userModel;
