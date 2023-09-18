const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ =require('lodash');

var contactSchema = new mongoose.Schema({
 
    name: {
        type: String,
        required: 'Firstname can\'t be empty',
    },
    phone: {
        type: String,
        required: 'Firstname can\'t be empty',

       
    },
  
    grade :
{ type: String,
    required: 'Firstname can\'t be empty',

  
},
message :{
    type: String,

},
subject :{
    type: String,
},
email8:
{  type: String,

},
name2:{type: String,
    },
  
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique:true ,

       },
      
},
);

// Custom validation for email
 contactSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.'); 


mongoose.model('Contact', contactSchema);