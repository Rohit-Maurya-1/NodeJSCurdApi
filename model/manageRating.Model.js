const  mongoose =require("mongoose")
const {Schema,model}=mongoose;
 const ratingSchema=new Schema({
    businessName:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    ountInStock:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    numReviews:{
        type:Number,
        required:true
    },
   profile:{
        type:String,
    }
   },
   {timestamps:true}
)
const RatingModel=model("rating",ratingSchema)
module.exports=RatingModel;


