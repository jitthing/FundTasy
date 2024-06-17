const jwt = require('jsonwebtoken');
const Users = require('../models/userModel');
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;
// Currently not used
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
    //   console.log("Decoded token: ", decoded);
      req.user = await Users.findById(decoded.id).select('-password');
      console.log("user details: ", req.user);
      next();
    } catch (error) {
        // handle TokenExpiredError
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ message: ' Your session has expired. Please log in again.' });
        }
        else if(error.name === 'JsonWebTokenError') {
            res.status(401).json({ message: 'Invalid token / Token has been tampered' });
        }
        else{
            res.status(401).json({ message: "Add this error to the if else block in authMiddleware file error is: " + error.name});
        }
    }
  } else {
    res.status(401).json({ message: 'test1' });
  }
};

module.exports = { protect };
