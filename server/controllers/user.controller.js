const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const _ =require('lodash'); 
const passport = require('passport');
const nodemailer =require("nodemailer");
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", 

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
module.exports.register = (req, res,next) => {
  
 

  var user = new User();
  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname ;
  user.email = req.body.email;
  user.password = req.body.password;
  user.role =req.body.role;
user.phone=req.body.phone;


  
  user.save((err, doc) => {
      if (!err)
          res.send(doc);
      else {
          if (err.code == 11000)
          res.status(422).send([' email address found.']);
          else
              return next(err);
        
      }

  });
   if (user.role !== 'Admin')
  { var mailOptions = {
     to: req.body.email,
     from: "ensi.admiin@gmail.com",
     subject: 'Your account password',
     text: 'this is your password:\n\n' +`${user.password}`
    
     }
     transporter.sendMail(mailOptions, (error) => {
         if (error) {
           res.json({ status: "ERROR" });
         } else { console.log("sent")
           res.json({ status: "Message Sent" , message :"seeent"});
         }});} 

}                   
 




module.exports.authenticate = (req, res) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) {return res.status(200).json({ firstname :user.firstname,lastname :user.lastname,email :user.email ,"token": user.generateJwt(),role :user.role });
      }
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = (req, res) =>{
  const id =req.params.id

    User.findById(id)
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

module.exports.userProfilebyEmail = (req, res) =>{
  const email =req.params.email
console.log(email)
    User.findOne({email:req.params.email})
    .then(data => {
      if (!data)
        res.status(404).send({ message: "user with id not found " + email});
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving candidat with id=" + email});
    });
}
module.exports.users = (req, res, next) =>{
  

  User.find().exec((err,user)=>{
    if(!err){
        res.json(user)
        
    }
   })
}
module.exports.delete = (req, res) => {
const id = req.params.id;
User.findByIdAndRemove(id)
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot delete user with id=${id}. `
      });
    } else {
      res.send({
        message: "User was deleted successfully!"
      
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
User.findByIdAndUpdate(id, req.body)  .then(data => {
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
    
  const email = req.params.email;
  console.log(email)
  User.findOneAndUpdate({email:req.params.email}, req.body)  .then(data => {
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
