const manageUser = require("../model/manageUserModel");
module.exports.addManageUser = async (req, res, next) => {
  try {
    const { name,email,phoneNumber}=req.body;
    if (!name || !email || !phoneNumber) {
      return res.status(401).send({
        status: false,
        message: "plz fil all data",
        Response: {},
      });
    }
    const UserEmail = await manageUser.findOne({email});
    if (UserEmail) {
      console.log("ewdewd", UserEmail);
      return res.status(400).send({
        status: false,
        message: "userEmail already exit",
        Response: {},
      });
    }
    const RegisterData = await manageUser.create({
      name,
      email,
      phoneNumber,
    });
    if (RegisterData) {
      return res.status(200).send({
        status: true,
        message: "user add successfully",
        Response: RegisterData,
      });
    } else {
      return res.status(401).send({
        status: true,
        message: "user not add",
        Response: {},
      });
    }
  } catch (error) {
    next(error);
  }
};

//================================getAllData==================================
module.exports.getManageUser = async (req, res, next) => {
  try {
    const getData = await manageUser.find();
    if (!getData){
      return res.status(400).send({
        status: false,
        message: "not get data",
        Response: {},
      });
    }
    res.status(200).send({
      status: true,
      message: "get all data",
      Response:getData,
    });
  } catch (error){
    next(error);
  }
};
//================================updateManageUserData============================================
module.exports.UpdateManageUser = async (req, res,next) => {
  try {
  const _id = req.params.id;
  const { name,phoneNumber}=req.body;
   const updateData = await manageUser.findByIdAndUpdate(
    { _id },
    {
      $set:{
        name,
        phoneNumber,
      },
    },
    {new:true}
  );
  if (!updateData) {
    return res.status(400).send({
      status: false,
      message: "user not update",
      Response: {},
    });
  }
  res.status(200).send({
    status: true,
    message: "user update successfully",
    Response: updateData,
  });
} catch (error) {
  next(error)
}
};
//================================ delete Manage user data ===========================================
module.exports.DeleteManageUser = async (req,res,next)=>{
  try {
    const _id = req.params.id;
    const deleteData = await manageUser.findByIdAndDelete(_id);
    if (!deleteData) {
      return res.status(400).send({
        status: false,
        message: "user not deleted",
        Response:{},
      });
    }
    res.status(200).send({
      status: true,
      message: "user deleted successfully",
      Response: deleteData,
    });
  } catch (error) {
      next(error)
  }
  };
  //=======================================seraching Data=======================================
  module.exports.searchAllData= async(req,res,next)=>{
   try {
    const getData= await manageUser.find({
      "$or":[
        {"name":{$regex:req.params.key}},
        // {"email":{$regex:req.params.key}}
      ]
    })
    res.status(200).send({
      status:200,
      maessage:"user search successfully",
      response:getData
    })
    } catch (error) {
     next(error)
   }
  }

  //=====================================filterData=========================================
  module.exports.getSearchFilter= async(req, res, next)=>{
    try {
       const filters = req.query;
       const setdata=  await manageUser.find()
       const filteredUsers = setdata.filter(user=>{
       let isValid = true;
      for (key in filters) {
        console.log(key, user[key], filters[key]);
        isValid = isValid && user[key] == filters[key];
       }
      return isValid;
     });
     console.log(filteredUsers)
     res.send(filteredUsers);
   
  } catch (error) {
      next(error)
    }
  }
    