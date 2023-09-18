const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ =require('lodash');

var memberSchema = new mongoose.Schema({
 
    firstname: {
        type: String,
        required: 'Firstname can\'t be empty'
    },
    lastname: {
        type: String,
        required: 'Last name can\'t be empty'
    },
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique : true ,

       },
    phone: {
        type: String,
        required: 'Pjone can\'t be empty',
        unique : true ,

       },
   level: {
        type: String,
        required: 'level can\'t be empty',
    },
    qu1 : {
        type :String 
    },
   qu2 : {
        type :String 
    },
    qu3:{
        type :String 
    },
   status :{
    type :String 
},
entretien:{
    type :String 
},
resdate:{
    type :String 
},
country:{
    type :String 
},
city:{
    type :String 
},
uni:{
    type :String 
},
bio:{
    type :String 
},
username:{
    type :String 
},
imagePath :{
    type :String

},

},
);

// Custom validation for email
 memberSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.'); 

// Events


 

/* memberSchema.method("toJSON",function (){
    const {__v , _id , ...object}=this.toObject() ;
    object.id=_id ;
    return object ;
   }) */
mongoose.model('Member', memberSchema);