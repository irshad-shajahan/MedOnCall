const ConversationModel = require("../models/ConversationModel");
const MessageModel = require("../models/MessageModel");
const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");
const upload = require("../multer");

module.exports={
        newConvo:async(req,res)=>{
        const {senderId,receiverId,userId} = req.body
        try{
            const newConversation = new ConversationModel({
                members:[senderId,receiverId]
            })
            await newConversation.save()
            res.status(201).send({message:'new conversation initialized',success:true})
        }catch(err){
            console.log(err);
            res.status(500).send({message:'error occurred',success:false})
        }
    },
    getconvo:async(req,res)=>{
        const {userId} = req.body
        try{
            const conversation = await ConversationModel.find({
                members:{$in:[userId]}
            })
            res.status(200).send({message:'message fetch succesful', success:true,conversation})
        }catch(err){
            console.log(err);
            res.status(500).send({message:'error occurred while fetching conversation',success:false})
        }
    },
    newMessage:async(req,res)=>{
     const newMessage =  new MessageModel(req.body)
     try{
        const savedMessage = await newMessage.save()
        res.status(201).send({message:'added succesfully',success:true,savedMessage})
     }catch(err){
        console.log(err);
        res.status(500).send({message:'error occurred while adding messages',success:false})
     }   
    },
    getMessages:async(req,res)=>{
        try{
            const messages = await MessageModel.find({
                conversationId:req.params.conversationId
            })
            res.status(200).send({message:'message fetch succesful',success:true,messages})
        }catch(err){
            console.log(err);
            res.status(500).send({message:'messages fetching unsucceful',success:false})
        }
    },
    getSecondUser:async(req,res)=>{
        console.log('------------------- fetch second user called -------------------------');
        const userId = req.params.userId
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
              doctor.value.bookedSlots=doctor.value.bookedSlots.reverse()
              const temp = await upload.getImageMultiple(doctor.value.additionalDetails.profileImage)
              doctor.value.additionalDetails.profileImage=temp
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
    }
}