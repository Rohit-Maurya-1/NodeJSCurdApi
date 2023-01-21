module.exports=(err,req,res,next)=>{
    try {
        if(err)
        res.status(500).send({message:err,status:500,Response:{}});
        else
        next()
    } catch (error) {
        console.log({message:error})
    }
}