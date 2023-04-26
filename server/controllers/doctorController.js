const doctorModel = require("../models/doctorModel");
const specialityModel = require("../models/specialityModel")
const upload = require("../multer");
const axios = require('axios')
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
    console.log(req.body.userId);
    try {
      const doctor = await doctorModel.findById(req.body.userId);
      console.log(doctor);
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
     console.log(doctor);
      if (doctor) {
        const doc = {
          isDoctor: doctor.isDoctor,
          isVerified: doctor.isVerified,
          isProfileComplete: doctor.isProfileComplete,
          isDuty:doctor.Duty
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
  fetchSpeciality:async(req,res)=>{
    try{
      const specialities = await specialityModel.find()
      res.status(200).send({message:'fetch successful',success:true,specialities})
    }catch(error){
      res.status(500).send({message:'Error occurred while fetching speciality'+error,success:false})
    }
  }
};
