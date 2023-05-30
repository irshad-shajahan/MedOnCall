const ConversationModel = require("../models/ConversationModel");
const MessageModel = require("../models/MessageModel");
const appointmentsModel = require("../models/appointmentsModel");
const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");
const upload = require("../multer");

module.exports = {
  newConvo: async (req, res) => {
   const {  receiverId, userId,appointmentId } = req.body;
    try {
      const appointment = await appointmentsModel.findById(appointmentId)
      appointment.active = true
      await appointment.save()
      // Check if a conversation already exists between the two users
      const existingConversation = await ConversationModel.findOne({
        members: { $all: [userId, receiverId] },
      });
      if (existingConversation) {
        if(!existingConversation.active){
          existingConversation.active=true;
        }
        await existingConversation.save()
        
        // If an existing conversation is found, send a response indicating it
        return res.status(200).send({
          message: 'Conversation already exists',
          success: true,
          conversation: existingConversation,
        });
      }
      const newConversation = new ConversationModel({
        members: [userId, receiverId],
      });
      const convo = await newConversation.save()
      res
        .status(201)
        .send({ message: "new conversation initialized", success: true,conversation:convo });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "error occurred", success: false });
    }
  },
  getconvo: async (req, res) => {
    const { userId } = req.body;
    try {
      const conversation = await ConversationModel.find({
        members: { $in: [userId] },
      });
      res
        .status(200)
        .send({
          message: "message fetch succesful",
          success: true,
          conversation,
        });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({
          message: "error occurred while fetching conversation",
          success: false,
        });
    }
  },
  newMessage: async (req, res) => {
    console.log('-------------------------');
    console.log(req.body);
    const newMessage = new MessageModel(req.body);
    try {
      const savedMessage = await newMessage.save();
      res
        .status(201)
        .send({ message: "added succesfully", success: true, savedMessage });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({
          message: "error occurred while adding messages",
          success: false,
        });
    }
  },
  getMessages: async (req, res) => {
    try {
      const messages = await MessageModel.find({
        conversationId: req.params.conversationId,
      });
      res
        .status(200)
        .send({ message: "message fetch succesful", success: true, messages });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "messages fetching unsucceful", success: false });
    }
  },
  getSecondUser: async (req, res) => {
    console.log(
      "------------------- fetch second user called -------------------------"
    );
    const userId = req.params.userId;
    try {
      const [user, doctor] = await Promise.allSettled([
        userModel.findOne({ _id: userId }),
        doctorModel.findOne({ _id: userId }),
      ]);
      if (user.status == "fulfilled" && user.value != null) {
        res.status(200).send({
          success: true,
          data: user.value,
        });
      }
      if (doctor.status == "fulfilled" && doctor.value != null) {
        doctor.value.bookedSlots = doctor.value.bookedSlots.reverse();
        const temp = await upload.getImageMultiple(
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
        message: "error fetching the second user",
        success: false,
        error,
      });
    }
  },
  endSession:async(req,res)=>{
    const {appointmentId,conversationId} = req.body
    try{
      const conversation =  await ConversationModel.findById(conversationId)
       conversation.active = false
       await conversation.save()
      const appointment = await appointmentsModel.findById(appointmentId)
      appointment.active = false
      appointment.completed=true
      await appointment.save()
      res.status(200).send({message:"session status update succesful",success:true})
    }catch(err){
      console.log(err);
      res.status(500).send({
        message: "error ending the session",
        success: false
      });
    }
  },
  getAgoraToken:(req,res)=>{
    console.log(req.body);
    const {AgoraToken} = req.body
    try{
      res.status(200).send({message:"token fetch succesful",success:true,AgoraToken})
    }catch(err){
      console.log(err);
      res.status(500).send({
        message: "There was error while fetching the token",
        success: false
      });
    }
  }
};
