const userModel = require('../models/userModels')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const doctorModel = require('../models/doctorModel');
module.exports={
    
    registerController:async(req,res)=>{
        const data = req.body;
        const check = req.body.isDoctor
        try{
            const password = data.password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password,salt)
            data.password=hashedPassword
            if(check){
                const newDoctor = new doctorModel(data)
                await newDoctor.save()
            }else{
                const newUser = new userModel(data)
                await newUser.save()
            }
            res.status(201).send({message:"Registered Successfully", success:true})
        }catch(error){
            console.log(error);
            res.status(500).send({success:false, message:`register controller ${error.message}`})
        }
    },
    loginController:async(req,res)=>{
        const data=req.body
        try{
            const promise1 = new Promise(async(resolve, reject) => {
                const Doctor = await doctorModel.findOne({phone:data.phone})
                if(Doctor){
                    resolve(Doctor)
                };
          });
            const promise2 = new Promise(async(resolve, reject) => {
                const User = await userModel.findOne({phone:data.phone})
                if(User){
                    resolve(User)
                }
                // else{
                //     reject()
                // }
            });
          
          Promise.race([promise1,promise2]).then(async(response)=>{
            const isMatch = await bcrypt.compare(data.password,response.password)
            if(!isMatch){
                return res.status(200).send({message:`Invalid Email or Password`, success:false})
            }
            const token= jwt.sign({id:response._id},process.env.JWT_SECRET, {expiresIn: '1d'})
            return res.status(200).send({message:`Login Succesful`, success:true,token,response})
            
            
            
            // }).catch(()=>{
        //     console.log('rejecxted');
        //     return res.status(200).send({message:'user not found',success:false})
          })
        }catch(error){
            console.log(error);
            res.status(500).send({message:`Error in Login Control ${error.message}`})
        }
    },
    authController:async(req,res)=>{
        try{
            const user = await doctorModel.findOne({_id:req.body.userId})
            if(!user){
                return res.status(200).send({
                    message:'user not found',
                    success:false
                })
            }else{
                res.status(200).send({
                    success:true,
                    data:user
                })
            }
        }catch(error){
            console.log(error);
            res.status(500).send({
                message:'auth error',
                success:false,
                error
            })
        }
    },
    googleRegisterController:async(req,res)=>{
        const data = req.body;
        data.isDoctor=false
        try{
            const User = await userModel.findOne({email:data.email})
            if(User){
                console.log(User,  "already existing");
            const token= jwt.sign({id:User._id},process.env.JWT_SECRET, {expiresIn: '1d'})
            res.status(200).send({message:'Login Success', success:true,token})
            }else{
            const newUser = new userModel(data)
            await newUser.save()
            const token= jwt.sign({id:newUser._id},process.env.JWT_SECRET, {expiresIn: '1d'})
            res.status(200).send({message:'Login Success', success:true,token})
        }
        }catch(error){
            console.log(error);
            res.status(500).send({message:`Error in Login Control ${error.message}`})
        }
    },
    existUser:async(req,res)=>{
        const {phone} = req.body
        const existUser = await userModel.findOne({phone:phone})
        if(existUser){
            return res.status(200).send({message:'User Already Exist', success:false})
        }else{
            res.status(200).send({success:true})
        }
    }
} 