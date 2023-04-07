const userController = require("../controllers/userController")

module.exports={
    register:(req,res)=>{
        let data = req.body
        userController.registerController(data)
    }
}