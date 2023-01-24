const manageUserController= require("../controller/manageUserController")
const authToken= require("../middleware/auth.middleware")
const express=require("express")
const router= express.Router()

router.post("/userAdd",authToken,manageUserController.addManageUser)
router.get("/getUserData",manageUserController.getManageUser)
router.put("/userUpdate/:id",manageUserController.UpdateManageUser)
router.delete("/userDelete/:id",manageUserController.DeleteManageUser)
router.get("/searchAllData/:key",manageUserController.searchAllData)
router.get("/getSearchFilter",manageUserController.getSearchFilter)
module.exports=router