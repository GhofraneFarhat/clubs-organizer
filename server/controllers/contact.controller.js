const mongoose = require('mongoose');
const Contact = mongoose.model('Contact');
const bcrypt = require('bcrypt');
const _ =require('lodash'); 
const passport = require('passport');
const nodemailer =require("nodemailer");
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "ensi.admiin@gmail.com",
    pass: "hcpxtgloaqtmdbqn",
  },
});
transporter.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

module.exports.save= (req, res) => {
  
 

  var member = new Contact();
  member.name = req.body.name;
 
  member.phone = req.body.phone;


  member.grade = req.body.grade;
  member.email = req.body.email;

  member.subject = req.body.subject;
  member.email8 = req.body.email8;
  member.name2 = req.body.name2;
  member.message = req.body.message;
  

  member.save((err, doc) => {
    console.log("hello")
      if (!err)
    {  console.log(doc)
          res.status(200).send(doc);
       // res.status(200).send(req.file);
      }
      else {
        console.log(err)
         
        
      }

  }); 
 

}                   
module.exports.send= (req, res) => {
    const message = req.body.message ;
    const subject = req.body.subject ;
    const email= req.params.email;
    const name2=req.body.name2;
    const email8=req.body.email8;


    var mailOptions = {
        to: email,
        from: "achwekmhenni123@gmail.com",
        subject: subject,
        text:message +  `\n\n from : \n name : ${name2} \n email : ${email8}`,
       
        }
        transporter.sendMail(mailOptions, (error) => {
            if (error) {
              res.json({ status: "ERROR" });
            } else { console.log("sent")
              res.json({ status: "Message Sent" , message :"seeent"});
            }})
}
module.exports.contactProfile =(req,res)=>{

    const id =req.params.id

    Contact.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Contact with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Contact with id=" + id });
    });



}

module.exports.contacts= (req, res, next) =>{
  

    Contact.find().exec((err,contact)=>{
      if(!err){
          res.json(contact)
          
      }
     })
  }




