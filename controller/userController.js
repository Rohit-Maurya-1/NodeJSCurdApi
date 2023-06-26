const UserData = require("../model/userModel");
const sendEmail= require("../middleware/nodeMailer")
const bcrypt = require("bcrypt");
const saltRounds = 10;
module.exports.userRegister = async (req, res, next) => {
  try {
    const { username,email, password,role } = req.body;
    if (!username || !email || !password) {
      return res.status(401).send({
        status: false,
        message: "plz fil data",
        Response:{},
      });
    }
    const UserEmail = await UserData.findOne({email});
    if (UserEmail){
      return res.status(400).send({
        status:false,
        message:"userEmail already exit",
        Response:{},
      });
    }
    const Password = await bcrypt.hash(password, saltRounds);
    const RegisterData = await UserData.create({
      username,
      email,
      password:Password,
      role
    });
    if (RegisterData){
      const token = RegisterData.generateToken();
      const data = await UserData.findOneAndUpdate(
        { email:email},
        { $set: {token: token }},
        { new: true }
      );
      return res.status(200).send({
        status: true,
        message: "user register successfully",
        Response: data,
      });
    } else {
      return res.status(401).send({
        status: false,
        message: "user not register",
        Response: {},
      });
    }
  } catch (error) {
    next(error);
  }
};
module.exports.adminLogin = async (req, res, next) => {
  try {
     const {email,password } = req.body;
    if (!email || !password){
      res.status(401).send({
        status: true,
        message: "plz fil all details",
        Response: {},
      });
    }
    const Useremail = await UserData.findOne({email});
     if (!Useremail) {
      return res.status(400).send({
        status: false,
        message: "invalid email!",
        Response:{},
      });
    }
   if(Useremail.role!=='admin'&& Useremail.role!=="subAdmin"){
      return res.send({
      status: false,
      message: "only admin permission allows!",
      
    });
  }
   const match = await bcrypt.compare(password, Useremail.password);
    if (!match){
      return res.status(400).send({
        status: false,
        message: "invalid password!",
        Response: {},
      });
    }
   
    let token = Useremail.generateToken();
    const data = await UserData.findOneAndUpdate(
        { email: email },
        { $set: {token: token}},
        { new: true}
      );
      res.status(200).send({
        status: true,
        message: "user login successfully",
        Response: data,
      });
    
    } catch (error){
    next();
  }
};

module.exports.changePassword= async(req,res,next)=>{
  try {
    const {password,newPassword}=req.body
    const _id = req.params.id
    const user= await UserData.findOne({_id})
    if(!user){
      res.status(400).send({
        status:false,
        message:"user not found",
        res:{}
      })
    }
   const userPassword= await bcrypt.compare(password, user?.password)
     if (!userPassword){
      return res.status(400).send({
        status:false,
        message:"invalid password",
        res:{}
      })
     }
    let hashPassword = await bcrypt.hash(newPassword, saltRounds);
    const changePassword= await UserData.findOneAndUpdate({_id:user},{password:hashPassword},{new:true})
     if(changePassword){
      res.status(200).send({
        status:true,
        message:"password change successfully",
        res:changePassword
      })
     }
  } catch (error) {
     next(error)
  }
}
//======================================================add users===============================

  //=====================forgot password===============================
  module.exports.forgotPassword= async(req,res,next)=>{
    try {
      const {email} =req.body
      const Email= await UserData.findOne({email})
     if(!Email){
         return res.status(401).send({
          status:401,
          message:"user not found",
          response: {}
         })
       }
       var OTP= Math.floor(Math.random() * 1000) + 999;
       const otpgenrate= await UserData.findOneAndUpdate({Email},{$set:{otp:OTP}},{new:true}) 
       let subject="forgot password"
       if(Email){
       const contant=`
        <div>
        <h1>${OTP}<h1>
        </div>
        `;
        sendEmail(email,subject,contant)
        return res.send({
        status:200,
        message:"forgot password",
        response: otpgenrate
        })
      }
    } catch (error) {
       next(error)
    }
  }
//==============================verify otp =========================================
 module.exports.verifyOtp= async(req,res,next)=>{
   try {
     const {email,otp}=req.body
     const isEmail= await UserData.findOne({email})
     if(!isEmail){
      return res.status(401).send({
         status:"401",
         message:'user not found',
         response:{}
      })
     }
     const isOtp= await UserData.findOne({otp})
     if(!isOtp){
      return res.status(401).send({
        status:"401",
        message:'!invalid api',
        response:{}
     })
     }
     isOtp.otp=""
    return res.status(200).send({
      status:"200",
      message:'otp verify successfully ',
      response: isOtp
   })
      }catch (error) {
     next(error)
   }
 }
 //===============================resetPassword password========================================

 module.exports.resetPassword= async(req,res,next)=>{
  try {
     const{email,password}=req.body
     const isEmail= await UserData.findOne({email})
     if(!isEmail){
      return res.status(200).send({
        status:"401",
        message:'user Not found',
        response: {}
     })
     }
     let hashPassword = await bcrypt.hash(password, saltRounds);
     const Pass= await UserData.findOneAndUpdate({email:email},{password:hashPassword},{new:true})
      if(Pass){
        return res.status(200).send({
          status:"200",
          message:'password resert successfully',
          response: Pass
       })
      }
  }catch (error) {
     next(error)
  }
 }
//==================pagination====================