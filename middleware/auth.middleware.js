const jwt = require("jsonwebtoken");
const SECRET_JWT = "rohit";
const  authToken=(req, res, next)=> {
  let token = req.headers["authorization"];
  if (token){
    token=token.split(' ')[0]
    jwt.verify(token, SECRET_JWT, (err,valid)=>{
      if (err) {
         res.status(401).send({message: "plz valid token!"});
      }else {
        next();
      }
    });
  }else{
     res.status(401).send({message:"plz provide token"});
  }
};
module.exports=authToken;
