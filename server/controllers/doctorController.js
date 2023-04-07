const doctorModel = require('../models/doctorModel');

module.exports={
    verifyExist:async(req,res)=>{
        const {phone} = req.body
        const existUser = await doctorModel.findOne({phone:phone})
        if(existUser){
            return res.status(200).send({message:'Doctor Already Exist', success:false})
        }else{
            res.status(200).send({success:true})
        }
        
    }
}