
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const User = require('../models/Login');

// Generate a random secret key
const generateRandomSecretKey = () => {
    return crypto.randomBytes(32).toString('hex');
  };
  
  // Use the generated secret key for signing JWTs
  const secretKey = generateRandomSecretKey();
  const generateToken = (userId) => {
    return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
  };


  const login = async (req, res) => {
    const { email, password } = req.body;
   
    try {
      // Find the user in the database by their email
      const user = await User.findOne({email});
  
      if (!user) {
        // If the user does not exist, return an error
        return res.status(401).json({ message: 'Invalid credentials (email not found)' });
      }
  
      // Compare the provided password with the stored hashed password
      const isPasswordValid = password===user.password;
  
      if (!isPasswordValid) {
        // If the password is not valid, return an error
        return res.status(401).json({ message: 'Invalid credentials (incorrect password)',
        Name:user.firstName,
    // Password:user.password ,
    Name:user.firstName,
});
      }
  
      // If both email and password are valid, generate a JWT token
      const token = generateToken(user._id);
      res.json({ token });
    } catch (error) {
      // Handle any errors that might occur during the process
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

module.exports = { login };
