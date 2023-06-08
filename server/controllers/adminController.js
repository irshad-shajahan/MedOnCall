const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const adminCredentials = {
  adminid: process.env.ADMIN_ID,
  password: process.env.ADMIN_PASSWORD,
};
const userModel = require("../models/userModels");
const doctormdel = require("../models/doctorModel");
const doctorModel = require("../models/doctorModel");
const specialityModel = require("../models/specialityModel");
const paymentModel = require("../models/PaymentModel");
const appointmentsModel = require("../models/appointmentsModel");
module.exports = {
  loginController: (req, res) => {
    const data = req.body;
    try {
      if (data.adminid != adminCredentials.adminid) {
        res.status(200).send({ message: "ID Mismatch", success: false });
      } else {
        if (data.password === adminCredentials.password) {
          const token = jwt.sign({ id: data.adminid }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });
          res
            .status(200)
            .send({ message: "Login Success", success: true, token });
        } else {
          res
            .status(200)
            .send({ message: "Password Mismatch", success: false });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: `admin login controller ${error.message}`,
        success: false,
      });
    }
  },
  userPanel: async (req, res) => {
    try {
      await userModel.find().then((Users) => {
        res.status(200).send({ users: Users, success: true });
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: `admin userpanel ${error.message}`, success: false });
    }
  },
  doctorpanel: async (req, res) => {
    try {
      await doctorModel.find().then((Users) => {
        res.status(200).send({ users: Users, success: true });
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: `admin userpanel ${error.message}`, success: false });
    }
  },
  doctorDetails: async (req, res) => {
    let id = req.params.id;
    const { url } = req.body;
    try {
      doctorModel.findById(id).then((data) => {
        data.additionalDetails.profileImage = url;
        res.status(200).send({
          message: "Data fetch successful",
          success: true,
          doctor: data,
        });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: `admin error while fetching doctor details:- ${error.message}`,
        success: false,
      });
    }
  },
  doctorVerify: async (req, res) => {
    let response;
    try {
      const doctor = await doctorModel.findById(req.body.doctorId);
      if (req.body.status) {
        doctor.isVerified = false;
        response = false;
      } else {
        doctor.isVerified = true;
        response = true;
      }
      await doctor.save();
      res.status(200).send({ success: true, response });
    } catch (err) {
      res.status(500).send({
        message: `there was a problem while updating the details ${err}`,
        success: false,
        response,
      });
    }
  },
  userCount: async (req, res) => {
    try {
      const doctors = await doctorModel.find();
      const patients = await userModel.find();
      res.status(200).send({
        message: "count fetch successful",
        Pcount: patients.length,
        Dcount: doctors.length,
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: `There was an error while fetching the count ${error}`,
        success: false,
      });
    }
  },
  addSpeciality: async (req, res) => {
    try {
      const speciality = {
        name: req.body.speciality,
      };
      const newSpeciality = new specialityModel(speciality);
      await newSpeciality.save();
      res.status(201).send({ message: "Added Successfully", success: true });
    } catch (error) {
      res
        .status(200)
        .send({ message: "Error occurred while adding", success: false });
    }
  },
  getSpecialities: async (req, res) => {
    try {
      const specialities = await specialityModel.find();
      res
        .status(200)
        .send({ message: "fetch successful", success: true, specialities });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error occurred while fetching", success: false });
    }
  },
  deleteSpeciality: (req, res) => {
    try {
      const id = req.params.id;
      specialityModel.deleteOne({ _id: id }).then((response) => {
        res.status(200).send({ message: "delete succesful", success: true });
      });
    } catch (error) {
      res.status(500).send({ message: "error occurred", success: false });
    }
  },
  paymentPanel: async (req, res) => {
    try {
   const paymentDocuments = await paymentModel.find()
   const updatedPaymentDocuments = await Promise.all(
    paymentDocuments.map(async (paymentDoc) => {
      const doctorData = await doctorModel.findOne({ _id: paymentDoc.doctorId });

      const updatedDoc = {
        ...paymentDoc.toObject(),
        doctorName: doctorData?.name || '',
        speciality: doctorData?.additionalDetails.speciality || '',
        doctorId: doctorData?._id || ''
      };

      return updatedDoc;
    })
  );

  res.status(200).send({message:"payment documents fetch succesful",success:true,doc:updatedPaymentDocuments})
  }catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "there was an error at payment panel api",success:true });
    }
  },
  approvePayment:async(req,res)=>{
    const {documentId,doctorId} = req.body
    try{
      const paymentDoc = await paymentModel.findById(documentId)
      const doctor = await doctorModel.findById(doctorId)
      doctor.wallet.CurrentBalance = paymentDoc.PendingPayment
      paymentDoc.TotalAmountPayedSinceRegistered+=paymentDoc.PendingPayment
      paymentDoc.PendingPayment = 0
      doctor.wallet.DueAmount = 0
      await doctor.save()
      await paymentDoc.save()
      const paymentDocuments = await paymentModel.find()
      const updatedPaymentDocuments = await Promise.all(
        paymentDocuments.map(async (paymentDoc) => {
          const doctorData = await doctorModel.findOne({ _id: paymentDoc.doctorId });
    
          const updatedDoc = {
            ...paymentDoc.toObject(),
            doctorName: doctorData?.name || '',
            speciality: doctorData?.additionalDetails.speciality || '',
            doctorId: doctorData?._id || ''
          };
    
          return updatedDoc;
        })
      );
      res.status(200).send({message:"payment documents fetch succesful",success:true,doc:updatedPaymentDocuments})
    }catch(err){
      console.log(err);
      res.status(500).send({message:"error while approving payment",success:false})
    }
  },
  popularDoctor:async(req,res)=>{
    try {
      const popularDoctorsQuery = [
        {
          $match: {
            "bookedSlots.slots": { $exists: true, $type: "array" }
          }
        },
        {
          $project: {
            name: 1,
            appointmentCount: { $size: "$bookedSlots.slots" }
          }
        },
        { $sort: { appointmentCount: -1 } },
        { $limit: 3 }
      ];
  
      const popularDoctors = await doctorModel.aggregate(popularDoctorsQuery);
  
      res.status(200).send({
        success: true,
        message: "Popular doctors fetched successfully",
        popularDoctors
      });
    } catch (error) {
      console.error("Error fetching popular doctors:", error);
      res.status(500).send({
        success: false,
        message: "Error fetching popular doctors",
        error
      });
    }
  },
  appointmentsRate:async(req,res)=>{
    try {
      const monthlyAppointments = await appointmentsModel.aggregate([
        {
          $group: {
            _id: {
              $dateToString: {
                format: '%Y-%m',
                date: { $toDate: '$date' }
              }
            },
            count: { $sum: 1 }
          }
        },
        {
          $sort: {
            _id: 1
          }
        }
      ]);
  
      res.send(monthlyAppointments);
    } catch (error) {
      console.error('Error fetching appointment numbers:', error);
      res.status(500).send({ error: 'Failed to fetch appointment numbers' });
    }
  },
  totalRevenue:async(req,res)=>{
    try {
      const result = await paymentModel.aggregate([
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: '$TotalCommissionEarned' },
          },
        },
      ]);
  
      if (result.length > 0) {
        const totalRevenue = result[0].totalRevenue;
        res.status(200).send({ totalRevenue });
      } else {
        res.status(404).send({ message: 'No payment records found' });
      }
    } catch (error) {
      console.error('Error finding total revenue:', error);
      res.status(500).send({ message: 'Internal server error' });
    }
  }
};
