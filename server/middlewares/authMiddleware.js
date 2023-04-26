const JWT = require('jsonwebtoken')
const validator= require('validator');

module.exports = async (req,res,next)=>{
    try{
        const token = req.headers['authorization'].split(" ")[1]
    JWT.verify(token,process.env.JWT_SECRET,(err,decode)=>{

        if(err || !validator.isJWT(token)){
            return res.status(400).send({
                message:'Auth Failed verify',
                success:false
            })
        }else{
            req.body.userId = decode.id
            next()
        }
    })
    }catch(error){
        console.log(error);
        res.status(401).send({
            message:"Auth Failed",
            success:false,
        });
    }

}