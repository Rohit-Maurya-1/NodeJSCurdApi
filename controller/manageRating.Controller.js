const  RatingModel= require("../model/manageRating.Model")
module.exports.addRating = async (req, res, next) => {
    try {
      const {
        businessName,
        discription,
        brand,
        category,
        price,
        ountInStock,
        rating,
        numReviews 
       } = req.body;
      const emailData = await RatingModel.findOne({businessName});
      if (emailData){
        return res.status(401).send({
          status: false,
          message: "businessName Allready exist",
          response: {},
        });
      }
      const addBusinessData = await RatingModel.create({
        businessName,
        discription,
        brand,
        category,
        price,
        ountInStock,
        rating,
        numReviews,
        profile: req.file.filename,
      });
      if (!addBusinessData) {
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
  };//======================================getRating==============================================
  module.exports.getRating = async (req, res, next) => {
    try {
      const getData = await RatingModel.find();
      if (!getData) {
        return res.status(400).send({
          status: false,
          message: "not get data",
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