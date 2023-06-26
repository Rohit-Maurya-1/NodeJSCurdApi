const manageUserData= require("../model/manageUserModel")
module.exports.addManageUser = async (req, res, next) => {
    try {
      const {username,email,phoneNumber}=req.body;
       if (!username || !email || !phoneNumber){
        return res.status(401).send({
          status: false,
          message: "plz fil all data",
          Response: {},
        });
      }
      const UserEmail = await manageUserData.findOne({email});
        if (UserEmail) {
          return res.status(400).send({
          status: false,
          message: "userEmail already exit",
          Response:{},
        });
      }
    const RegisterData = await manageUserData.create({
        username,
        email,
        phoneNumber,
      });
      if (RegisterData){
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
      }
    catch (error){
      next(error);
    }
  };
  module.exports.getManageUser = async (req, res, next) => {
    try {
      const getData = await manageUserData.find();
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
  module.exports.UpdateManageUser = async (req, res,next) => {
    try {
    const _id = req.params.id;
    const { username,phoneNumber}=req.body;
     const updateData = await manageUserData.findByIdAndUpdate(
      { _id },
      {
        $set:{
          username,
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
  module.exports.DeleteManageUser = async (req,res,next)=>{
    try {
      const _id = req.params.id;
      const deleteData = await manageUserData.findByIdAndDelete(_id);
      if (!deleteData){
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
  module.exports.searchAllData= async(req,res,next)=>{
     try {
      const getData= await manageUserData.find({
        "$or":[
          {"username":{$regex:req.params.key}},
          {"email":{$regex:req.params.key}}
        ]
      })
      res.status(200).send({
        status:200,
        maessage:"user search successfully",
        response:getData
      })
      } catch (error){
       next(error)
     }
    }
  module.exports.getSearchFilter= async(req, res, next)=>{
      try {
         const filters =req.query;
         const setdata=  await manageUserData.find()
         const filteredUsers = setdata.filter(user=>{
         let isValid = true;
         for(key in filters){
           isValid = isValid && user[key] == filters[key];
         }
        return isValid;
       });
         res.send(filteredUsers);
     
    } catch (error) {
        next(error)
      }
    }
 //=======================================pagination======================================================
    // module.exports.pagination=async(req,res,next)=>{
    //   try {
    //     const{page}=req.body
    //     let skip;
    //     if(page<=1){
    //       skip=0;
    //     }else{
    //       skip=(page-1)*2
    //     }
    //      const  data= await manageUserData.find().skip(skip).limit(2)
    //     if(data){
    //      return res.status(200).send({
    //        status:true,
    //        message:"user find successfully",
    //        response:data
    //      })
    //     }
    //   } catch (error) {
    //      next(error)
    //   }
    //  }
     //================================================//pagination========================//
      module.exports.pagination=async(req,res)=>{
      const page = parseInt(req.query.page) || 1; // Current page number
      const limit = parseInt(req.query.limit) || 10; // Number of items per page
       try {
        const totalCount = await manageUserData.countDocuments(); // Total count of items
        const totalPages = Math.ceil(totalCount / limit); // Total number of pages
        const skip = (page - 1) * limit; // Number of items to skip
        const data = await manageUserData.find()
          .skip(skip)
          .limit(limit)
          .exec();
        res.json({
          data,
          totalPages,
          currentPage: page,
          totalCount,
        });
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    };