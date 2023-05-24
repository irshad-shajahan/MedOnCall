const mongoose = require("mongoose");

const appointmentsSchema = new mongoose.Schema(
  {
    DoctorId: String,
    userId: String,
    time: String,
    date: String,
    patientName: String,
    patientPhone: Number,
    doctorName:String,
    doctorPhone:Number,
    profileImage:String
  },
  {
    timestamps: true,
  }
);

const appointmentsModel = mongoose.model("Appointments", appointmentsSchema);
module.exports = appointmentsModel;
