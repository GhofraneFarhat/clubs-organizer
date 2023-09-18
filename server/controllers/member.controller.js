const mongoose = require('mongoose');
const Member = mongoose.model('Member');
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
/* module.exports.upload=(req,res)=>{

  if (req.file){
    const pathname=req.file.path;
    res.status(200).send(req.file)
  }
} */
module.exports.upload= (req, res) => {
  
 

  var member = new Member();
  member.firstname = req.body.firstname;
  member.lastname = req.body.lastname ;
  member.email = req.body.email;
  member.phone = req.body.phone;
  member.level = req.body.level;

member.imagePath='http://localhost:3002/images/' + req.file.filename;  
member.qu1=req.body.qu1;
member.qu2=req.body.qu2;
member.qu3=req.body.qu3;
member.status=req.body.status;
member.username=req.body.username;
member.entretien=req.body.entretien;
member.resdate=req.body.resdate;


  member.save((err, doc) => {
    console.log("hello")
      if (!err)
    {  console.log(doc)
          res.status(200).send(doc);
       // res.status(200).send(req.file);
      }
      else {
        console.log(err)
          if (err.code == 11000)
              res.status(422).send(' email address found.');
        
      }

  }); 
 

}                   
 





module.exports.memberProfile = (req, res) =>{
  const id =req.params.id

    Member.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found user with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving user with id=" + id });
    });
}

module.exports.members = (req, res, next) =>{
  

  Member.find().exec((err,user)=>{
    if(!err){
        res.json(user)
        
    }
   })
}
module.exports.delete = (req, res) => {
const id = req.params.id;
Member.findByIdAndRemove(id)
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot delete Member with id=${id}. `
      });
    } else {
      res.send({
        message: "Member was deleted successfully!"
      
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete User with id=" + id
    });
  });
};
module.exports.update = (req,res)=>{
  
const id = req.params.id;
Member.findByIdAndUpdate(id, req.body)  .then(data => {
  if (!req.body) {
    return res.status(400).send(
       ['Data to update can not be empty!']
    );
  }
  if (!data) {
    res.status(404).send({
      message: `Cannot update user with id=${id}. Maybe user was not found!`
    });
  } else res.send({ message: "user was updated successfully." });
})
.catch(err => {
  
  res.send({ message: "error" });
});
};
module.exports.updateEmail = (req,res)=>{
  
  const email = req.body.email;
  Member.findOneAndUpdate(email, req.body)  .then(data => {
    if (!req.body) {
      return res.status(400).send(
         ['Data to update can not be empty!']
      );
    }
    if (!data) {
      res.status(404).send({
        message: `Cannot update user with email=${email}. Maybe user was not found!`
      });
    } else res.send({ message: "user was updated successfully." });
  })
  .catch(err => {
    
    res.send({ message: "error" });
  });
  };