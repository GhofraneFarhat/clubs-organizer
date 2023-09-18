const ctrlUser = require('../controllers/user.controller');
const ctrlMember =require('../controllers/member.controller');
const ctrlContact =require('../controllers/contact.controller');
const express = require('express');
const router = express.Router();
const jwtHelper = require('../config/jwtHelper');
const storage=require('../helpers/storage');

router.post('/authenticate', ctrlUser.authenticate);
router.post('/register',ctrlUser.register);
router.put("/user/:id", ctrlUser.update);
router.delete("/user/:id", ctrlUser.delete);
router.get('/usersProfile' ,ctrlUser.users) ;
router.get('/contacts' ,ctrlContact.contacts) ;

router.get('/userProfile',ctrlUser.userProfile)
router.get('/userbyemail/:email',ctrlUser.userProfilebyEmail);

router.post('/upload', storage,ctrlMember.upload);

router.post('/save',ctrlContact.save);
router.post('/send/:email',ctrlContact.send);

//router.post('/save', storage,ctrlMember.savee);
router.put("/member/:id", ctrlMember.update);
router.put("/usersupdate/:email", ctrlUser.updateEmail);


router.put("/member", ctrlMember.updateEmail);
router.delete("/member/:id", ctrlMember.delete);
router.get('/membersProfile' ,ctrlMember.members) ;
router.get('/memberProfile',ctrlMember.memberProfile);
module.exports = router;
