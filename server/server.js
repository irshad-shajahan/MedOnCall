
const express = require('express');
const session = require("express-session");
const app = express();
const http = require("http")
const colors = require('colors');
const morgan = require('morgan');
const cors =require('cors')
const server = http.createServer(app)
const io = require("socket.io")(server, {
  path: '/server/socket.io/',
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true
  }
});
app.use(
  session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
require('./listeners/socketManager')(io)

const dotenv = require('dotenv');
//dotenv config
dotenv.config()

const connectDB = require('./config/db');
//mongodb connection
connectDB();

//middlewares
app.use(express.json());
app.use(morgan('dev'))

//cors
// app.use(cors({
//   origin:['http://localhost:3000', 'http://localhost:3001'],
//   credentials: true
// }))
app.use(cors())
//port

const port = process.env.PORT || 8080
//listen port
server.listen(port,()=>{
    console.log(`server running in ${process.env.NODE_MODE} Mod on port ${process.env.PORT}`.bgCyan.white);
});

const userRouter = require("./routes/userRoutes")
const adminRouter = require("./routes/adminRoutes")
const doctorRouter = require('./routes/doctorRoutes')
const comRouter = require('./routes/communicationRoutes')

//routes
app.use("/api",userRouter)
app.use("/api/admin",adminRouter)
app.use("/api/doctor",doctorRouter)
app.use("/api/com",comRouter)






