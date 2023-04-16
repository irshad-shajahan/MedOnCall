const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const adminCredentials={
    adminid:process.env.ADMIN_ID,
    password:process.env.ADMIN_PASSWORD,
}
const userModel = require('../models/userModels')
const doctormdel = require('../models/doctorModel')
const doctorModel = require('../models/doctorModel')
module.exports={
    loginController:(req,res)=>{
        const data = req.body
        try{
            if(data.adminid!=adminCredentials.adminid){
                res.status(200).send({message:"ID Mismatch", success:false})
            }else{
                if(data.password===adminCredentials.password){
                    const token = jwt.sign({id:data.adminid},process.env.JWT_SECRET, {expiresIn:'1d'})
                    res.status(200).send({message:"Login Success",success:true,token})
                }else{
                    res.status(200).send({message:"Password Mismatch",success:false})
                }
            }
        }catch(error){
            console.log(error);
            res.status(500).send({message:`admin login controller ${error.message}`,success:false})
        }
    },
    userPanel:async(req,res)=>{
        try{
            await userModel.find().then((Users)=>{
                res.status(200).send({users:Users,success:true})
            })  
        }catch(error){
            console.log(error);
            res.status(500).send({message:`admin userpanel ${error.message}`,success:false})
        }
    },
    doctorpanel:async(req,res)=>{
        try{
            await doctorModel.find().then((Users)=>{
                res.status(200).send({users:Users,success:true})
            })  
        }catch(error){
            console.log(error);
            res.status(500).send({message:`admin userpanel ${error.message}`,success:false})
        }
    },
    doctorDetails:async(req,res)=>{
        let id = req.params.id
        const {url} = req.body
        try{
             doctorModel.findById(id).then((data)=>{
                data.additionalDetails.profileImage = url
                res.status(200).send({message:"Data fetch successful",success:true,doctor:data})
             })

        }catch(error){
            console.log(error);
            res.status(500).send({message:`admin error while fetching doctor details:- ${error.message}`,success:false})
        }
    },
    doctorVerify:async(req,res)=>{
        let response
        try{
            const doctor = await doctorModel.findById(req.body.doctorId)
            if(req.body.status){
                doctor.isVerified=false
                response=false
            }else{
                doctor.isVerified=true
                response=true
            }
            await doctor.save()
            res.status(200).send({success:true,response})
        }catch(err){
            res.status(500).send({message:`there was a problem while updating the details ${err}`,success:false,response})
        }
    },
    userCount:async(req,res)=>{
        try{
            const doctors = await doctorModel.find()
        const patients = await userModel.find()
        res.status(200).send({message:"count fetch successful",Pcount:patients.length,Dcount:doctors.length,success:true})
        }catch(error){
            console.log(error);
            res.status(500).send({message:`There was an error while fetching the count ${error}`,success:false})
        }
    }
}