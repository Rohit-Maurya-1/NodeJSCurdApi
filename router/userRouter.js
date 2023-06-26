const userController= require("../controller/userController")
const  manageUserController= require("../controller/manageUserController")
const authToken= require("../middleware/auth.middleware")
// const validation= require("../validation/userSchemaValidation")
const express=require("express")
const router= express.Router()
//=========================================login================================
router.post("/register",userController.userRegister)
router.post("/adminLogin",userController.adminLogin)
router.post("/changePassword/:id",userController.changePassword)
router.post("/forgotPassword",userController.forgotPassword)
router.post("/verifyOtp",userController.verifyOtp)
router.post("/resetPassword",userController.resetPassword)
//========================================manageuserRouter====================================
router.post("/userAdd",manageUserController.addManageUser)
router.get("/getUserData",manageUserController.getManageUser)
router.put("/userUpdate/:id",manageUserController.UpdateManageUser)
router.delete("/userDelete/:id",manageUserController.DeleteManageUser)
router.get("/searchAllData/:key",manageUserController.searchAllData)
router.get("/getSearchFilter",manageUserController.getSearchFilter)
router.get("/pagination",manageUserController.pagination)


//===============================================================================
module.exports=router