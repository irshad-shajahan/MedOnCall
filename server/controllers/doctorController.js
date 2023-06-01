const appointmentsModel = require("../models/appointmentsModel");
const doctorModel = require("../models/doctorModel");
const specialityModel = require("../models/specialityModel");
const upload = require("../multer");
const axios = require("axios");
module.exports = {
  verifyExist: async (req, res) => {
    const { phone } = req.body;
    const existUser = await doctorModel.findOne({ phone: phone });
    if (existUser) {
      return res
        .status(200)
        .send({ message: "Doctor Already Exist", success: false });
    } else {
      res.status(200).send({ success: true });
    }
  },

  doctorProfileComplete: async (req, res) => {
    try {
      const { speciality, qualification, council, Fee, regNumber, regYear } =
        req.body;
      const doctor = await doctorModel.findOne({ phone: req.params.id });
      if (!doctor) {
        return res.status(404).send("Doctor not found");
      }
      doctor.isProfileComplete = true;
      doctor.additionalDetails = {
        profileImage: req.params.id + ".jpg",
        speciality,
        qualification,
        council,
        Fee,
        regNumber,
        regYear,
      };

      await doctor.save();
      res.status(200).send({ message: "Details Updated", success: true });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "Details not Updated", success: false });
    }
  },
  dutyToggle: async (req, res) => {
    try {
      const doctor = await doctorModel.findById(req.body.userId);
      if (doctor.Duty) {
        doctor.Duty = false;
      } else {
        doctor.Duty = true;
      }
      doctor.save();
      res.status(200).send({ message: "updated succesfully,", success: true });
    } catch (err) {
      res.status(500).send({ message: "error occured", success: false });
    }
  },
  checkDoc: async (req, res) => {
    try {
      const doctor = await doctorModel.findById(req.body.userId);
      if (doctor) {
        const doc = {
          isDoctor: doctor.isDoctor,
          isVerified: doctor.isVerified,
          isProfileComplete: doctor.isProfileComplete,
          isDuty: doctor.Duty,
        };
        res.status(200).send({ success: true, doc: doc });
      } else {
        res.status(200).send({ message: "not a doctor", success: false });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "error occured", success: false });
    }
  },
  fetchSpeciality: async (req, res) => {
    try {
      const specialities = await specialityModel.find();
      res
        .status(200)
        .send({ message: "fetch successful", success: true, specialities });
    } catch (error) {
      res.status(500).send({
        message: "Error occurred while fetching speciality" + error,
        success: false,
      });
    }
  },
  fetchDoctors: async (req, res) => {
    try {
      const speciality = req.params.speciality;
      const doctors = await doctorModel.find({
        "additionalDetails.speciality": speciality,
        "isVerified":true
      });
      if (doctors.length != 0) {
        const updatedDoctors = await Promise.all(
          doctors.map(async (elem) => {
            const temp = await upload.getImageMultiple(elem.additionalDetails.profileImage);
            elem.additionalDetails.profileImage = temp;
            return elem;
          }))
        res
          .status(200)
          .send({ message: "fetch succesful", success: true, updatedDoctors });
      } else {
        res.status(200).send({
          message: "fetch unsuccesful no doctors in the given speciality",
          success: false,noDoctor:true
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: "Error occurred while fetching doctors" + err,
        success: false,
      });
    }
  },
  updateLeave: async (req, res) => {
    const { startDate, endDate, userId } = req.body;
    try {
      const doctor = await doctorModel.findById(userId);
      const leaveDate ={
        startDate:startDate,
        endDate:endDate
      }
      doctor.leaveDates.push(leaveDate)
      await doctor.save();
      res.status(200).send({ message: "updated succesfully", success: true });
    } catch (err) {
      res.status(500).send({ message: err, success: false });
    }
  },
  fetchLeave: async (req, res) => {
    const { userId } = req.body;
    try {
      const doctor = await doctorModel.findById(userId);
      if (doctor) {
        res.status(200).send({
          message: "fetch Successful",
          leaveDates: doctor.leaveDates,
          success: true,
        });
      } else {
        res.status(200).send({ message: "Doc not found", success: false });
      }
    } catch (error) {
      res.status(500).send({ message: err, success: false });
    }
  },
  removeLeave:async(req,res)=>{
   const {date,userId} = req.body
    try{
      doctorModel.updateOne(
        {
          _id:userId
        },
        { $pull: { leaveDates: date} }
      ).then((response)=>{
        res.status(200).send({message:response,success:true})
      })
    }catch(err){
      res.status(500).send({ message: err, success: false });
    }
  },
  updateTimeSlot:async(req,res)=>{
    const {timeSlot, userId} = req.body
    try{
      const doctor = await doctorModel.findById(userId);
    doctor.timeSlots = timeSlot
    await doctor.save()
      res.status(200).send({message:'update successful',success:true})
    }catch(err){
      res.status(500).send({ message: err, success: false });
    }
  },
  fetchTimeSlots:async(req,res)=>{
    const{userId} = req.body
    try{
      const doctor = await doctorModel.findById(userId);
      const timeSlot = doctor.timeSlots
      res.status(200).send({message:'fetch successful',success:true,timeSlot})
    }catch(err){
      res.status(500).send({ message: err, success: false });
    }
  },
  fetchAppointments:async(req,res)=>{
    const {userId} = req.body
    try{
      const appointments = await appointmentsModel.find({DoctorId:userId}).sort({createdAt:-1})
      res.status(200).send({message:'Appointment fetch succesful',success:true,appointments}) 
    }catch(err){
      console.log(err);
      res.status(500).send({message:'There was an error while fetching doctor appointments',success:false})
    }
  },
  submitPrescription:async(req,res)=>{
    const {age,appointmentId,diagnosedCondition,gender,medicines,patientName,userId} = req.body
    try{
      const appointment = await appointmentsModel.findById(appointmentId)
      const doctor = await doctorModel.findById(userId)
      appointment.prescriptionDone=true
      const prescriptionData = {
        patientName,  
        Age:age,
        DoctorSpeciality:doctor.additionalDetails.speciality,
        diagnosedCondition,
        gender,
        medicines
      }
      appointment.prescription=prescriptionData
      appointment.save()
      res.status(200).send({message:'Prescription submitted',success:true})
    }catch(error){
      console.log(error);
      res.status(500).send({message:"there was an error while submitting the prescription",success:false})
    }
  }
};
