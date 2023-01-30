const  BusinessController= require("../controller/businessController")
 const express = require("express")
 const router= express();
 const upload= require("../middleware/fileupload");
router.post("/addBusiness",upload.single("imageData"),BusinessController.addBusinessList)
router.get("/getBusinessDetails",BusinessController.getBusinessDetails)
router.patch("/business/:id",upload.array("imageData",3),BusinessController.UpdateBusinessDetails)
router.delete("/businessDelete/:id",BusinessController.DeleteBusinessDetails)
module.exports=router

