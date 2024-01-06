const express=require('express');
const router=express.Router();


// signin
const {registerUser} = require('../controllers/userController');
router.post('/register', registerUser);

// login
const loginController = require('../controllers/loginController');
router.post('/login', loginController.login);

module.exports=router;