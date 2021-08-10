const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const { v4: uuidv4 } = require('uuid');
const S3 = require('aws-sdk/clients/s3');
const s3 = new S3();

module.exports = {
  signup,
  login,
  profile
};

function signup(req, res) {
  console.log(req.body, req.file)
  const filePath = `${uuidv4()}/${req.file.originalname}`
  const params = {Bucket: process.env.BUCKET_NAME, Key: filePath, Body: req.file.buffer};
  s3.upload(params, async function(err, data){
    console.log(data, 'from aws')
    const user = new User({...req.body, photoUrl: data.Location});
    try {
      await user.save();
      const token = createJWT(user);
      res.json({ token });
    } catch (err) {
      res.status(400).json(err);
    }
  })
}

async function login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.password, (err, isMatch) => {
        
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

async function profile(req, res){
  console.log(req.params);
  try{
    const user = await User.findOne({username: req.params.username});
    console.log(user);
    if(!user){
      res.status(403).json({message: 'Please Login'});
    } else {
    res.status(200).json({user: user});
    }
  } catch(err){
    console.log(err);
    res.json({err});
  }
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user},
    SECRET,
    {expiresIn: '24h'}
  );
}
