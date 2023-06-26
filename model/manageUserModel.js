const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    username: {
      type: String,
      require:true
     },
    email: {
      type: String,
      require:true
      },
     phoneNumber:{
      type: Number,
      require:true
    },
    },
    {timestamps:true}
    )
    const manageUserData = mongoose.model("manageUserData", userSchema);
    module.exports = manageUserData;
