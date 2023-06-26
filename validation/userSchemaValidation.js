const Joi = require("joi");
const validation=(req,res,next)=>{
  const JoiSchema = Joi.object().keys({
    userName: Joi.string().min(5).max(30).required(),
    email: Joi.string().email().min(5).max(50).required(),
    password: Joi.string().min(5).max(50).required(),
  });
  let {error}= JoiSchema.validate(req.body,{abortEarly:false});
  if (error) {
    const {message}=error;
    return res.status(200).send({
      status: false,
      message: message,
      Response: {},
    });
  } else {
    next();
  }
};
module.exports = validation;
//=================================================================================================