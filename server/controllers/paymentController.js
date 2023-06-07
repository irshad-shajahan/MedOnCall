const { addPaymentData, getPayment, removePaymentData } = require("../listeners/PaymentListner");
const paymentModel = require("../models/PaymentModel");
const appointmentsModel = require("../models/appointmentsModel");
const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");

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
  initiatePayment: async (doctorId) => {
    try {
      const doctor = await doctorModel.findById(doctorId);
      const doctorPayment = await paymentModel.findOne({ doctorId });
      const appointments = await appointmentsModel.find({ DoctorId: doctorId });
      const commission = Math.round(doctor.additionalDetails.Fee * 0.07);
      const newPendingPayement = doctor.additionalDetails.Fee - commission;
      if (doctorPayment) {
        doctorPayment.CurrentFee = doctor.additionalDetails.Fee;
        doctorPayment.TotalAppointments = appointments.length;
        doctorPayment.TotalCommissionEarned += commission;
        doctorPayment.PendingPayment += newPendingPayement;
        await doctorPayment.save();
        doctor.wallet.totalAppointments = doctorPayment.TotalAppointments;
        doctor.wallet.DueAmount = doctorPayment.PendingPayment;
        await doctor.save();
      } else {
        const paymentData = {
          doctorId,
          CurrentFee: doctor.additionalDetails.Fee,
          TotalAppointments: appointments.length,
          TotalCommissionEarned: commission,
          PendingPayment: newPendingPayement,
        };
        const paymentDoc = new paymentModel(paymentData);
        await paymentDoc.save();
        doctor.wallet.DueAmount += newPendingPayement;
        await doctor.save();
      }
    } catch (error) {
      console.log(error);
    }
  },
  ConfirmBooking: async (req, res) => {
    const { userId } = req.body;
    const payData = getPayment(userId);
    const updatedSession = await stripe.checkout.sessions.retrieve(payData?.paymentId);
    const {time,sessionDate,doctorId} = updatedSession.metadata;
    
    try {
      if (updatedSession.payment_status == "paid"){     
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
          console.log('entered lenght greater condition');
          const matchedDate = doctor.bookedSlots.find(
            (slot) => slot.date === sessionDate
          );
          if (matchedDate) {
            console.log('entered match date');
            console.log('match date:',matchedDate);
            const matchedTime = matchedDate.slots.find(
              (slot) => slot.time === time
            );
            if (matchedTime) {
              console.log('entered matched time');
              console.log('matched time:',matchedTime)
              res.status(200).send({
                message: "The Slot is already booked",
                success: false,
              });
            } else {
              console.log('entered matched time else');
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

