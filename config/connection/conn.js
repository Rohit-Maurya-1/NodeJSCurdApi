const mongoose= require("mongoose");
const dotenv=require("dotenv")

// DATABASE='mongodb+srv://rohit:Rctm9025b@cluster0.moipvf2.mongodb.net/burnout?retryWrites=true&w=majority'
// const DB='mongodb+srv://rohit:Rctm9025b@cluster0.moipvf2.mongodb.net/burnout?retryWrites=true&w=majority'
 dotenv.config()
 const DB=process.env.DATABASE
 const connection= mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then((res)=>{
     console.log("connection successfully")
}).catch((err)=>{
 console.log("connection  error")
})
module.exports=connection;