const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const cors =require('cors')
const dotenv = require('dotenv');
const connectDB = require('./config/dB');
const userRouter = require("./routes/userRoutes")
const adminRouter = require("./routes/adminRoutes")
const doctorRouter = require('./routes/doctorRoutes')
const comRouter = require('./routes/communicationRoutes')
//dotenv config
dotenv.config()

//mongodb connection
connectDB();

//rest object
const app = express();

//cors
app.use(cors({
    origin:['http://localhost:3000', 'http://localhost:3001'],
    credentials: true
  }))

//middlewares
app.use(express.json());
app.use(morgan('dev'))

//routes
app.use("/",userRouter)
app.use("/admin",adminRouter)
app.use("/doctor",doctorRouter)
app.use("/com",comRouter)

//port
const port = process.env.PORT || 8080
//listen port
app.listen(port,()=>{
    console.log(`server running in ${process.env.NODE_MODE} Mod on port ${process.env.PORT}`.bgCyan.white);
});