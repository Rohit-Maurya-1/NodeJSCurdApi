  const nodemailer=require('nodemailer')
  var transport = nodemailer.createTransport({
    service: 'gmail',
    // port: 2525,
    auth: {
      user: "rohitmaurya8026@gmail.com",
      pass: "ezkfyiffqlxrbosw"
    }
  });
const sendEmail=(email,subject,content)=>{
    transport.sendMail({
        from:'rohitmaurya8026@gmail.com',
        to: email,
        subject: subject,
        html: content
    })
        .then(info =>{ return true;})
        .catch(error => console.log(error))
}
module.exports=sendEmail;