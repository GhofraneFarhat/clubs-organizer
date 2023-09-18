const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ =require('lodash');
var clubSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: 'Firstname can\'t be empty'
    },
    lastname: {
        type: String,
        required: 'Last name can\'t be empty'
    },
    clubname: {
        type: String,
        required: 'Clubname can\'t be empty'
    },
  
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique : true ,

       },
       emailclub: {
        type: String,
        required: 'Emailclub can\'t be empty',
        unique : true ,

       },
    role :
{ type: String,
    required: 'role can\'t be empty',
},
password: {
    type: String,
    required: 'Password can\'t be empty',
    minlength : [6,'Password must be atleast 6 character long']
},
},
);
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
        
            next();
        });
    });
});
userSchema.methods.verifyPassword=function(password){
    return bcrypt.compareSync(password,this.password);
}
userSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id,
    role :this.role ,
    firstname:this.firstname,
    lastname:this.lastname ,
},
        process.env.JWT_SECRET
    );
}
// Custom validation for email
 contactSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.'); 


mongoose.model('Club', clubSchema);