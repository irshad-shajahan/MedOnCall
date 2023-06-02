const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");
const appointmentsModel = require("../models/appointmentsModel");
const { getImageMultiple } = require("../multer");
const fs = require("fs");
const PDFDocument = require("pdfkit");
const { generateHeader, generateHr, generateTableRow, docDetails, generateFooter, DiagnosedCondition } = require("../middlewares/pdfFuntions");
const { initiatePayment } = require("./paymentController");
module.exports = {
  registerController: async (req, res) => {
    const data = req.body;
    const check = req.body.isDoctor;
    try {
      const password = data.password;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      data.password = hashedPassword;
      if (check) {
        const newDoctor = new doctorModel(data);
        await newDoctor.save();
      } else {
        const newUser = new userModel(data);
        await newUser.save();
      }
      res
        .status(201)
        .send({ message: "Registered Successfully", success: true });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: `register controller ${error.message}`,
      });
    }
  },
  loginController: async (req, res) => {
    const data = req.body;
    try {
      const [user, doctor] = await Promise.allSettled([
        userModel.findOne({ phone: data.phone }),
        doctorModel.findOne({ phone: data.phone }),
      ]);
      if (user.status == "fulfilled" && user.value != null) {
        const isMatch = await bcrypt.compare(
          data.password,
          user.value.password
        );
        if (!isMatch) {
          return res
            .status(200)
            .send({ message: `Invalid Email or Password`, success: false });
        }
        const token = jwt.sign({ id: user.value._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        return res
          .status(200)
          .send({
            message: `Login Succesful`,
            success: true,
            token,
            response: user.value,
          });
      }
      if (doctor.status == "fulfilled" && doctor.value != null) {
        const isMatch = await bcrypt.compare(
          data.password,
          doctor.value.password
        );
        if (!isMatch) {
          return res
            .status(200)
            .send({ message: `Invalid Email or Password`, success: false });
        }
        const token = jwt.sign(
          { id: doctor.value._id },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );
        return res
          .status(200)
          .send({
            message: `Login Succesful`,
            success: true,
            token,
            response: doctor.value,
          });
      }
      if (user.status == "fulfilled" && doctor.status == "fulfilled") {
        if (user.value == null && doctor.value == null) {
          return res.status(200).send({
            message: "User Doesn't Exist",
            success: false,
          });
        }
      } else {
        return res.status(500).send({
          message: "Promise not fulfilled",
          success: false,
        });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: `Error in Login Control ${error.message}` });
    }
  },
  authController: async (req, res) => {
    try {
      const [user, doctor] = await Promise.allSettled([
        userModel.findOne({ _id: req.body.userId }),
        doctorModel.findOne({ _id: req.body.userId }),
      ]);
      if (user.status == "fulfilled" && user.value != null) {
        res.status(200).send({
          success: true,
          data: user.value,
        });
      }
      if (doctor.status == "fulfilled" && doctor.value != null) {
        doctor.value.bookedSlots = doctor.value.bookedSlots.reverse();
        const temp = await getImageMultiple(
          doctor.value.additionalDetails.profileImage
        );
        doctor.value.additionalDetails.profileImage = temp;
        res.status(200).send({
          success: true,
          data: doctor.value,
        });
      }
      if (user.status == "fulfilled" && doctor.status == "fulfilled") {
        if (user.value != null && doctor.value != null) {
          return res.status(404).send({
            message: "user not found",
            success: false,
          });
        }
      } else {
        return res.status(404).send({
          message: "Promise not fulfilled",
          success: false,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "auth error",
        success: false,
        error,
      });
    }
  },
  googleRegisterController: async (req, res) => {
    const data = req.body;
    data.isDoctor = false;
    try {
      const User = await userModel.findOne({ email: data.email });
      if (User) {
        const token = jwt.sign({ id: User._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        res
          .status(200)
          .send({ message: "Login Success", success: true, token });
      } else {
        const newUser = new userModel(data);
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        res
          .status(200)
          .send({ message: "Login Success", success: true, token });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: `Error in Login Control ${error.message}` });
    }
  },
  existUser: async (req, res) => {
    const { phone } = req.body;
    const existUser = await userModel.findOne({ phone: phone });
    if (existUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    } else {
      res.status(200).send({ success: true });
    }
  },
  userPhoneAdd: async (req, res) => {
    try {
      const id = req.body.userId;
      const checkUser = await userModel.findOne({ phone: req.body.phone });
      const checkDoc = await doctorModel.findOne({ phone: req.body.phone });
      if (checkDoc || checkUser) {
        res
          .status(200)
          .send({ message: "The number is already taken", success: false });
      } else {
        const user = await userModel.findById(id);
        user.phone = req.body.phone;
        await user.save();
        res
          .status(200)
          .send({
            message: "The phone was successfully updated",
            success: true,
          });
      }
    } catch (error) {
      res
        .status(500)
        .send({
          message: "There was an error while updating the phone",
          success: false,
        });
    }
  },
  doctorProfile: async (req, res) => {
    const { url } = req.body;
    const doctorId = req.params.id;
    try {
      const doctor = await doctorModel.findOne({
        _id: doctorId,
        isVerified: true,
      });
      if (doctor) {
        doctor.additionalDetails.profileImage = url;
        res
          .status(200)
          .send({
            message: "fetching doctor details succesful",
            success: true,
            doctor,
          });
      }
    } catch (err) {
      res
        .status(500)
        .send({
          message: "There was an error while fetching doctor details",
          success: false,
        });
    }
  },
  bookSlot: async (req, res) => {
    const { time, doctorId, sessionDate, userId } = req.body;
    try {
      const patient = await userModel.findById(userId);
      const doctor = await doctorModel.findById(doctorId);
      const data = {
        DoctorId: doctorId,
        userId,
        time,
        date: sessionDate,
        doctorName: doctor.name,
        doctorPhone: doctor.phone,
        patientName: patient.name,
        patientPhone: patient.phone,
      };
      const newAppointment = new appointmentsModel(data);
      newAppointment.save().then(async (response) => {
        initiatePayment(doctorId)
        const booking = {
          date: sessionDate,
          slots: [
            {
              time: time,
              AppointmentId: response._id,
              patientName: patient.name,
              patientId: userId,
            },
          ],
        };
        if (doctor.bookedSlots.length > 0) {
          const matchedDate = doctor.bookedSlots.find(
            (slot) => slot.date === sessionDate
          );
          if (matchedDate) {
            const matchedTime = matchedDate.slots.find(
              (slot) => slot.time === time
            );
            if (matchedTime) {
              res
                .status(200)
                .send({ message: "The Slot is already booked", success: false });
            } else {
              const timeSlot = {
                time: time,
                AppointmentId: response._id,
                patientName: patient.name,
                patientId: userId,
              };
              matchedDate.slots.push(timeSlot);
              await doctor.save();
              res
                .status(200)
                .send({ message: "Slot booking succesful", success: true });
            }
          } else {
            doctor.bookedSlots.push(booking);
            await doctor.save();
            res
              .status(200)
              .send({ message: "Slot booking succesful", success: true });
          }
        } else {
          doctor.bookedSlots.push(booking);
          await doctor.save();
          res
            .status(200)
            .send({ message: "Slot booking succesful", success: true });
        }
      });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({
          message: "There was an error while booking the slot",
          success: false,
        });
    }
  },
  fetchAppointments: async (req, res) => {
    const { userId } = req.body;
    try {
      const appointments = await appointmentsModel
        .find({ userId: userId })
        .sort({ createdAt: -1 });
      const updatedAppointments = await Promise.all(
        appointments.map(async (elem) => {
          const doctor = await doctorModel.findById(elem.DoctorId);
          const temp = await getImageMultiple(
            doctor.additionalDetails.profileImage
          );
          elem.profileImage = temp;
          return elem;
        })
      );
      res
        .status(200)
        .send({
          message: "Appointment fetch succesful",
          success: true,
          updatedAppointments,
        });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({
          message: "There was an error while fetching user appointments",
          success: false,
        });
    }
  },
  submitFeedback: async (req, res) => {
    const { appointmentId, doctorId, review, rating, userId } = req.body;
    try {
      const appointment = await appointmentsModel.findById(appointmentId);
      appointment.rating.push(rating);
      appointment.reviews = review;
      await appointment.save();
      const doctor = await doctorModel.findById(doctorId);
      doctor.feedback.rating.push(rating);
      doctor.feedback.review.push(review);
      await doctor.save();
      res
        .status(201)
        .send({ message: "feedback submitted succesfully", success: true });
    } catch (err) {
      res
        .status(500)
        .send({
          message: "There was an error while submitting the feedback",
          success: false,
        });
    }
  },
  downloadPrescription: async(req, res) => {
    console.log(req.body);
    const {appointmentId} = req.params
    try {
      const appointment = await appointmentsModel.findById(appointmentId)
      const medicines = appointment.prescription.medicines
      console.log(appointment);
      const doc = new PDFDocument({ size: "A4", margin: 50 });
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=test.pdf");
      doc.pipe(res);
      await generateHeader(doc,appointmentId.slice(0,8)) 
      await generateHr(doc,185)
      await docDetails(doc,appointment.doctorName,appointment.date,appointment.time,appointment.prescription.patientName,appointment.prescription.Age,appointment.prescription.gender)
      await generateHr(doc,250)
      await DiagnosedCondition(doc,appointment.prescription.diagnosedCondition)
      await generateHr(doc,320)
      await generateTableRow(doc,335,"Medicine","Dosage","Sl no.")
      await generateHr(doc,350)
      let position = 340
      let serielNo=0
      for(let i=0;i<medicines.length;i++){
        position = position+30
        serielNo++
        await generateTableRow(doc,position,medicines[i].medicine,medicines[i].dosage,serielNo)

      }
      await generateFooter(doc,750)
      doc.end();
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "error while generating pdf", success: false });
    }
  },
  updateProfile:async(req,res)=>{
    const {phone,name,userId} = req.body
    try{
      const user = await userModel.findById(userId)
      if(name && phone){
        user.name = name
        user.phone = phone
        user.save()
        res
        .status(201)
        .send({ message: "feedback submitted succesfully", success: true });
      }else{
        res
      .status(402)
      .send({ message: "error while upadting profile", success: false });
      }
    }catch(err){
      console.log(err);
      res
      .status(500)
      .send({ message: "error while upadting profile", success: false });
    }
  },
  consultationCount:async(req,res)=>{
    const {userId} = req.body
    try{
      const appointments = await appointmentsModel.find({userId})
      console.log(appointments);
      const count = appointments.length
      res
        .status(201)
        .send({ message: "appointment count succesfully", success: true ,count});
    }catch(err){
      console.log(err);
      res
      .status(500)
      .send({ message: "error while fetching appointments count", success: false });
    }
  }
};
