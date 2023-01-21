const  mongoose =require("mongoose")
 const userSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:Number,
        required:true
    },
   },
  {timestamps:true}
)
  const manageUser= mongoose.model("manageUser",userSchema)
   module.exports=manageUser;


