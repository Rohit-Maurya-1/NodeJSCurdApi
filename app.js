const express = require("express")
const router = express.Router();
require("./config/connection/conn")
const dotenv= require("dotenv")
const cors= require("cors")
const YAML= require("yamljs")
const error =require("./middleware/errorHandlerMiddlewae")
const UserRouter= require("./router/userRouter")
const addBusinessRouter= require("./router/businessRouter")
const ratingRouter= require("./router/manageRating.Router")
dotenv.config()
const swaggerUI= require("swagger-ui-express");
const swaggerJsDocs= YAML.load("Swagger/user.yaml")

const Port = process.env.PORT
const app= express();
app.use(express.urlencoded({extended:false}));
app.set('view engine', 'ejs');
app.use(express.static("./image"))
app.use(express.json())
app.use(cors())
app.use(error)
app.use((UserRouter))
app.use((addBusinessRouter))
app.use((ratingRouter))
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerJsDocs))
app.get("/string",(req,res)=>{
    res.send("this is string")
})
app.get("/user",(req,res)=>{
    res.send({
        id:1,
        name:"rohit"
    })
})

 app.listen(Port,(req,res)=>{
  console.log(`server running in port ${Port}`)
})