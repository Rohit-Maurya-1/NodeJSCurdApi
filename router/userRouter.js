const userController= require("../controller/userController")
const validation= require("../validation/userSchemaValidation")
const express=require("express")
const router= express.Router()

router.post("/register", validation,userController.userRegister)
router.post("/login",userController.userLogin)
module.exports=router