const UserData = require("../model/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
module.exports.userRegister = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
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
      userName,
      email,
      password:Password,
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

//=======================================verify email  then user login ======================
//====================login api in nodejs =====================================
module.exports.userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
     if (!email || !password) {
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
        Response: {},
      });
    }
    const match = await bcrypt.compare(password, Useremail.password);
    if (!match) {
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
      message: " user login successfully",
      Response: data,
    });
  } catch (error) {
    next();
  }
};
//====================================manageUser====================================================
