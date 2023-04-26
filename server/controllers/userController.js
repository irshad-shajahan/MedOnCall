const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");
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
        const isMatch = await bcrypt.compare(data.password, user.value.password);
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
          .send({ message: `Login Succesful`, success: true, token, response:user.value });
      }
      if (doctor.status == "fulfilled" && doctor.value != null) {
       const isMatch = await bcrypt.compare(data.password, doctor.value.password);
        if (!isMatch) {
          return res
            .status(200)
            .send({ message: `Invalid Email or Password`, success: false });
        }
        const token = jwt.sign({ id: doctor.value._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        return res
          .status(200)
          .send({ message: `Login Succesful`, success: true, token, response:doctor.value });
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
        console.log(User, "already existing");
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
  userPhoneAdd:async(req,res)=>{
    try{
    const id = req.body.userId
    const checkUser = await userModel.findOne({phone:req.body.phone})
    const checkDoc = await doctorModel.findOne({phone:req.body.phone})
    if(checkDoc || checkUser){
      res.status(200).send({message:'The number is already taken',success:false})
    }else{
      const user = await userModel.findById(id)
      user.phone=req.body.phone
      await user.save()
      res.status(200).send({message:'The phone was successfully updated',success:true})
    }
    }catch(error){
      res.status(500).send({message:'There was an error while updating the phone',success:false})
    }
  }
};
