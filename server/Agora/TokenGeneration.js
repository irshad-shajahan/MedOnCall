const {RtcTokenBuilder,RtcRole} = require('agora-token')




  module.exports={
    generateRtcToken: (req,res,next)=>{
        try{
            const generateRtcToken = () => {
                const appId = '8c8115633818496bb363251d6909fcb0';
                const appCertificate = 'b277f7a934cf4ec9a342bbfe688be59f';
                const channelName = req.params.appointmentId;
                const uid=0;
                const role = RtcRole.PUBLISHER;
                const expirationTimeInSeconds = 3600
                const currentTimestamp = Math.floor(Date.now() / 1000)
                const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds
                const tokenA = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpiredTs);
                req.body.AgoraToken=tokenA
              }
            generateRtcToken()
            next()
        }catch(err){
            console.log(err);
            res.status(500).send({
                message:"Token generation Failed",
                success:false,
            });
        }
    }
  }
  