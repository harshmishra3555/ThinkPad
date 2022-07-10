const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser');

const JWT_SECRET='Harshisagoodb$oy';
// Route 1 Create a User using POST "/api/auth/createuser". No login required
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //Check whether user with same email exist
  try {    
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Sorry a user with this email already exists" });
    }
    const salt= await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });
    const data={
      user:{
        id:user.id
      }
    }
    const authtoken = jwt.sign(data,JWT_SECRET);
    // console.log(authtoken);
    res.json({authtoken});
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error occured");
  }
})

// Route 2 Authenticate a User using POST "/api/auth/login" No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email,password}=req.body;
  try{
    let user=await User.findOne({email});
    if(!user){
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }
    const passwordcompare=await bcrypt.compare(password,user.password);
    if(!passwordcompare){
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }
    const data={
      user:{
        id:user.id
      }
    }
    const authtoken = jwt.sign(data,JWT_SECRET);
    res.json({authtoken});
  }catch(error){
    console.log(error);
    res.status(500).send("Internal server error occured");
  }
});

// Route 3 get loggedin user details using POST "/api/auth/getuser". Login required
router.post('/getuser',fetchuser, async (req, res) => {

  try{
      const userId=req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
  }catch(error){
      console.log(error);
      res.status(500).send("Internal server error occured");
  }
})
module.exports = router