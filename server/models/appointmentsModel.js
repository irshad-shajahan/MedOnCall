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
    profileImage:String,
    rating:{
      type:[Number],
      maxlength:20
    },
    reviews:String,
    active:{
      type:Boolean,
      default:false
    },
    prescriptionDone:Boolean,
    prescription:{
      patientName:String,
      Age:Number,
      DoctorSpeciality:String,
      diagnosedCondition:String,
      gender:String,
      medicines:[{
        dosage:String,
        medicine:String,
      }]
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const appointmentsModel = mongoose.model("Appointments", appointmentsSchema);
module.exports = appointmentsModel;
