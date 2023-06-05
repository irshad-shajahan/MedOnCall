const paymentModel = require("../models/PaymentModel");
const appointmentsModel = require("../models/appointmentsModel");
const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");

require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

module.exports = {
  checkOutHelper: async (req, res) => {
    const { doctorId, appointmentId, userId } = req.body;
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
          userName: user.name,
          doctorName: doctor.name,
          // appointmentId:appointmentId
        },
        mode: "payment",
        success_url: "https://medoncall.online/user/success",
        cancel_url: "https://medoncall.online/user/cancel",
      });
      console.log(session);
      req.session.verifyid = session.id;
      req.session.name = "irshad";
      res
        .status(200)
        .send({
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
    console.log("initiate payment called");
    console.log(doctorId);
    try {
      const doctor = await doctorModel.findById(doctorId);
      const doctorPayment = await paymentModel.findOne({ doctorId });
      const appointments = await appointmentsModel.find({DoctorId:doctorId})
      const commission = Math.round(doctor.additionalDetails.Fee*0.07) 
      const newPendingPayement = doctor.additionalDetails.Fee-commission
      if (doctorPayment) {
        doctorPayment.CurrentFee=doctor.additionalDetails.Fee
        doctorPayment.TotalAppointments=appointments.length
        doctorPayment.TotalCommissionEarned+=commission
        doctorPayment.PendingPayment+=newPendingPayement
        await doctorPayment.save()
        doctor.wallet.totalAppointments = doctorPayment.TotalAppointments
        doctor.wallet.DueAmount=doctorPayment.PendingPayment
        await doctor.save();
      } else {
        const paymentData = {
          doctorId,
          CurrentFee: doctor.additionalDetails.Fee,
          TotalAppointments:appointments.length,
          TotalCommissionEarned:commission,
          PendingPayment:newPendingPayement
        };
        const paymentDoc = new paymentModel(paymentData)
        await paymentDoc.save();
        doctor.wallet.DueAmount+=newPendingPayement
        await doctor.save();
      }
      
    } catch (error) {
      console.log(error);
    }
  },
};
