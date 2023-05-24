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
