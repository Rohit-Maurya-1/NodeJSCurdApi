const express = require("express")
require("./config/connection/conn")
const dotenv= require("dotenv")
const cors= require("cors")
const error =require("./middleware/errorHandlerMiddlewae")
const UserRouter= require("./router/userRouter")
const manageUserRouter=require("./router/manageUserRouter")
const addBusinessRouter= require("./router/businessRouter")
 dotenv.config()
const Port = process.env.PORT
const app= express();
app.use(express.urlencoded({extended:false}));
app.use(express.static("./image"))
app.use(express.json())
app.use(cors())
app.use(error)
app.use((UserRouter))
app.use((manageUserRouter))
app.use((addBusinessRouter))

app.listen(Port,(req,res)=>{
    console.log(`server running in port ${Port}`)
})