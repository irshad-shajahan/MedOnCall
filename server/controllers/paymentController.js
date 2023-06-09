const { addPaymentData, getPayment, removePaymentData } = require("../listeners/PaymentListner");
const paymentModel = require("../models/PaymentModel");
const appointmentsModel = require("../models/appointmentsModel");
const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");
const { initiatePayment } = require("./userController");

require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

module.exports = {
  checkOutHelper: async (req, res) => {
    const { doctorId, userId, time, sessionDate } = req.body;
    try {
      const user = await userModel.findById(userId);
      const doctor = await doctorModel.findById(doctorId);
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: doctorId,
              },
              unit_amount: doctor.additionalDetails.Fee * 100,
            },
            quantity: 1,
          },
        ],
        metadata: {
          userId,
          time,
          sessionDate,
          doctorId
        },
        mode: "payment",
        success_url: "https://medoncall.online/user/success",
        cancel_url: "https://medoncall.online/user/cancel",
      });
      req.session.verifyid = session.id;
      addPaymentData({ paymentId: session.id, userId });
      req.session.name = "irshad";
      res.status(200).send({
        message: "stripe account creation succesful",
        success: true,
        url: session.url,
        verify: session.id,
      });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "error occurred at payment", success: false });
    }
  },
  ConfirmBooking: async (req, res) => {
    const { userId } = req.body;
    const payData = getPayment(userId);
    
    try {
      const updatedSession = await stripe.checkout.sessions.retrieve(payData?.paymentId);
      const {time,sessionDate,doctorId} = updatedSession.metadata;
      if (updatedSession.payment_status == "paid"){
        const intePayment = await initiatePayment(doctorId)     
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
        async function addAppointment(){
          const newAppointment = new appointmentsModel(data);
          const appointmentData = await newAppointment.save()
          removePaymentData(userId)
          return appointmentData._id
        }
        if (doctor.bookedSlots.length > 0) {
          const matchedDate = doctor.bookedSlots.find(
            (slot) => slot.date === sessionDate
          );
          if (matchedDate) {
            const matchedTime = matchedDate.slots.find(
              (slot) => slot.time === time
            );
            if (matchedTime) {
              res.status(200).send({
                message: "The Slot is already booked",
                success: false,
              });
            } else {
              const AppointmentId = await addAppointment();
              const timeSlot = {
                time: time,
                AppointmentId,
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
            console.log('entered match date else ');
            const AppointmentId = await addAppointment();
            const booking = {
              date: sessionDate,
              slots: [
                {
                  time: time,
                  AppointmentId,
                  patientName: patient.name,
                  patientId: userId,
                },
              ],
            };
            doctor.bookedSlots.push(booking);
            await doctor.save();
            res
              .status(200)
              .send({ message: "Slot booking succesful", success: true });
          }
        } else {
          console.log('entered lengyht else condition');
          const AppointmentId = await addAppointment();
          const booking = {
            date: sessionDate,
            slots: [
              {
                time: time,
                AppointmentId,
                patientName: patient.name,
                patientId: userId,
              },
            ],
          };
          doctor.bookedSlots.push(booking);
          await doctor.save();
          res
            .status(200)
            .send({ message: "Slot booking succesful", success: true });
        }
      }else{
        res.status(200).send({
          message: "payment not complete",
          success: false,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: "error while veryfying payment",
        success: false,
      });
    }
  },
};

