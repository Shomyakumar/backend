const User = require('../models/Signup');
const Userlogin=require("../models/Login");
exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({ firstName, lastName, email, password, confirmPassword });
    await newUser.save();
    const newUserLogin=new Userlogin({email,password});
    await newUserLogin.save();
    // You can customize the response based on your needs
    res.status(201).json({ success: true, message: 'User registered successfully' });
  } 
  catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


