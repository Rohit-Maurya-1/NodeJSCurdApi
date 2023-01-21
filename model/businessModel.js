const  mongoose =require("mongoose")
const {Schema,model}=mongoose;
 const BusinessSchema=new Schema({
    businessName:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true,
    },
    emailAddress:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    availableHours:{
        type:String,
    },
    websiteLink:{
        type:String,
    },
    profile:{
        type:String,
    }
   },
   {timestamps:true}
)
const BusinessModel=model("business",BusinessSchema)
module.exports=BusinessModel;


