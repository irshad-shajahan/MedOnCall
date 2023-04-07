const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const adminCredentials={
    adminid:process.env.ADMIN_ID,
    password:process.env.ADMIN_PASSWORD,
}
const userModel = require('../models/userModels')

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
    }
}