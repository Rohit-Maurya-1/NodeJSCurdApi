const BusinessModel = require("../model/businessModel");
module.exports.addBusinessList = async (req, res, next) => {
  try {
    console.log(req.body,"ooooooooooooooooooooooooooooooooooooooooooooo")
    console.log(req.file,"fjfrjfjfjfrjfrjfrfjfjjf")
    const {
      businessName,
      address,
      emailAddress,
      phoneNumber,
      availableHours,
      websiteLink,
    } = req.body;
    const emailData = await BusinessModel.findOne({emailAddress});
    if (emailData) {
      return res.status(401).send({
        status: false,
        message: "email Address Allready exist",
        response: {},
      });
    }
    const addBusinessData = await BusinessModel.create({
      businessName,
      address,
      emailAddress,
      phoneNumber,
      availableHours,
      websiteLink,
      profile:req.file.filename,
    });
    if (!addBusinessData){
      return res.status(401).send({
        status: false,
        message: "not data",
        response: {},
      });
    }
    res.status(200).send({
      status: true,
      message: "add business successfully",
      response: addBusinessData,
    });
  } catch (error) {
    next(error);
  }
};
//==================================get business details==================================
module.exports.getBusinessDetails = async (req, res, next) => {
  try {
    const getData = await BusinessModel.find();
    if (!getData) {
      return res.status(400).send({
        status: false,
        message:"not get data",
        response: {},
      });
    }
    res.status(200).send({
      status: true,
      message: "get all data",
      response: getData,
    });
  } catch (error) {
    next(error);
  }
};
//===============================updateData======================================
module.exports.UpdateBusinessDetails = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const { businessName, address, phoneNumber, availableHours, websiteLink } = req.body;
    if (req.file) {
      var dataRecords = {
        businessName,
        address,
        phoneNumber,
        availableHours,
        websiteLink,
        profile: req.file.filename,
      };
    } else {
      var dataRecords = {
        businessName,
        address,
        phoneNumber,
        availableHours,
        websiteLink,
      };
    }
    const updateData = await BusinessModel.findByIdAndUpdate(_id, dataRecords);
    if (!updateData){
      return res.status(400).send({
        status: false,
        message: "user not update",
        Response: {},
      });
    }
    res.status(200).send({
      status:true,
      message: "user update successfully",
      Response: updateData,
    });
  } catch (error){
    next(error);
  }
};
//==============================deleteBusinessuser====================================
module.exports.DeleteBusinessDetails = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const deleteData = await BusinessModel.findByIdAndDelete(_id);
    if (!deleteData){
      return res.status(400).send({
        status: false,
        message: "user not deleted",
        Response: {},
      });
    }
    res.status(200).send({
      status: true,
      message: "user deleted successfully",
      Response: deleteData,
    });
  } catch (error){
    next(error);
  }
};
