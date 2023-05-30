const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  doctorId: {
    type: String,
    required: [true, "doctorId is required"],
    unique: true
  },
  CurrentFee:Number,
  TotalAppointments:Number,
  TotalCommissionEarned:Number,
  TotalAmountPayedSinceRegistered:{
    type:Number,
    default:0
  },
  PendingPayment:Number
});

const paymentModel = mongoose.model("Payment", PaymentSchema);
module.exports = paymentModel;
