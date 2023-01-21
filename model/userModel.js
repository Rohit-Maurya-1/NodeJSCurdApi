const  mongoose =require("mongoose")
const jwt =require("jsonwebtoken");
  const SECRET_JWT= "rohit" 
// const {userSchema,UserData}=mongoose
  const  userSchema= mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String
    },
   
},
  {timestamps:true}
)
userSchema.methods.generateToken=function(){
    let token=jwt.sign({id:this._id,email:this.email},SECRET_JWT);
    return token;
}
  
   const UserData= mongoose.model("userData",userSchema)
   module.exports=UserData;



