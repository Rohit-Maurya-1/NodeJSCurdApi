const  RatingController= require("../controller/manageRating.Controller")
const express = require("express")
const ratingRouter= express();
const upload= require("../middleware/fileupload");
ratingRouter.post("/addRating",upload.single("imageData"),RatingController.addRating)
ratingRouter.get("/getRating",RatingController.getRating)
module.exports=ratingRouter;