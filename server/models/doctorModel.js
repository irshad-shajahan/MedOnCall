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
  wallet:{
    DueAmount:{
      type:Number,
      default:0
    },
    CurrentBalance:{
      type:Number,
      default:0
    },
    amountWithdrawn:{
      type:Number,
      default:0
    },
    totalAppointments:{
      type:Number,
      default:0
    }
  }
  ,
  email: {
    type: String,
  },
  profilePhoto: {
    type: String,
  },
  password: {
    type: String,
    // required:[true,'password is required']
  },
  isDoctor: {
    type: Boolean,
  },
  Duty: Boolean,
  isProfileComplete: {
    type: Boolean,
    default: false,
  },
  leaveDates: {
    type: Array,
  },
  timeSlots: {
    type: Array,
  },
  feedback:{
    rating:{
      type:[Number],
      maxlength:20
    },
    review:{
      type:[String],
      maxlength:6
    }
  },
  additionalDetails: {
    profileImage: String,
    speciality: String,
    qualification: String,
    council: String,
    Fee: Number,
    regNumber: Number,
    regYear: Number,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  bookedSlots: {
    type: [{ date: String,_id:false, slots: [{ time: String, AppointmentId: String,patientName:String,patientId:String ,_id:false}] }],
  },
});

const doctorModel = mongoose.model("doctors", doctorSchema);
module.exports = doctorModel;
