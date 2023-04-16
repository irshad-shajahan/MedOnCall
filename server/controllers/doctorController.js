const doctorModel = require("../models/doctorModel");
const upload = require("../multer");
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
      const {
        speciality,
        qualification,
        council,
        hospital,
        regNumber,
        regYear,
      } = req.body;
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
        hospital,
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
};
