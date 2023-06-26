const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const SECRET_JWT = "rohit";
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
    
    },
    email: {
      type: String,
      
    },
    password: {
      type: String,
      
    },
    phoneNumber: {
      type: Number,
    },
    token: {
      type: String,
    },
    role:{
      type:String,
      enum:['subAdmin','admin'],
      default:"viewer"
    },
    // isAdmin:{
    //   type:Boolean,
    //   default:false
    // },
    otp:{
       type:String
    }
  },
  { timestamps: true }
);
userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id, email: this.email,isAdmin: this.isAdmin, role:this.role }, SECRET_JWT);
};

const UserData = mongoose.model("userData", userSchema);
module.exports = UserData;
