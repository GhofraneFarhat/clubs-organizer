const mongoose = require('mongoose');
const Club = mongoose.model('Club');

const nodemailer =require("nodemailer");


module.exports.save= (req, res) => {
  
 

  var member = new Club();
  member.firstname = req.body.firstname;
  member.lastname = req.body.lastname;
  member.clubname = req.body.clubname;
  member.email = req.body.email;
  member.emailclub = req.body.emailclub;

  member.role = req.body.role;
 
  

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
              else 
              res.status(404).send('something went wrong')
        
      }

  }); 
 

}  