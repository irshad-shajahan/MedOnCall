const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
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
    type:Boolean,    
}
,isProfileComplete:{
  type:Boolean,
  default:false
},
additionalDetails:{
  profileImage:String,
  speciality:String,
  qualification:String,
  council:String,
  hospital:String,
  regNumber:Number,
  regYear:Number
},
isVerified:{
  type:Boolean,
  default:false
}
});

const doctorModel = mongoose.model("doctors", doctorSchema);
module.exports = doctorModel;
