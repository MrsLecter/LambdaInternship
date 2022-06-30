const mongoConnect = require("../util/database").mongoConnect;
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuid } = require('uuid')
const url = require('url');
require('dotenv').config();


const { saveUser, findUserByEmail, saveTokens, findTokens } = require("../util/dataAccess");
const {getRandomTTL} = require("../util/utils");


//user registration
exports.userReg = (req, res, next) => {
  //catch request data validation results
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  let userObj;
  findUserByEmail(email)
    .then((user) => {
      if (user) {
        return res.status(409).json({ "message": "Conflict. User is already exists" });
      } else {
        return bcrypt.hash(password, 12)
        .then((hashPasswd) => {
          userObj = {
            email: email,
            password: hashPasswd,
          };
          saveUser(userObj);
          return res.status(201).json({"message": "User successfully registered" });
        });
      }
    })
    .catch((err) =>{
      const error = new Error(err);
      error.httpStatusCode(500);
      return next(error)}
      );
};


//logs in and gives you an access token with a TTL (time to live) of 30 to 60 seconds (random)
exports.logIn = (req, res, next) => {
    let userLogin;
    const params = url.parse(req.url,true).query;
    const { email, password } =  params;
    //validation
    findUserByEmail(email)
    .then((user) => {
      if(!user){
        res.status(403).json({" message": "Not found. Please, register first" });
      }
      bcrypt.compare(password, user.password)
      .then(isMatch => {
        if(isMatch){
            //time to live in ms
            const ttl = getRandomTTL();
            const refreshToken = uuid();
            const token = jwt.sign({email: user.email}, process.env.SECRET_KEY, {expiresIn: ttl });
            saveTokens({"user": "curent","email": user.email, "accessToken": token,  "refreshToken": refreshToken});
            return res.status(202)
            .json({ "message": "Accepted", "accessToken": token, "refreshToken": refreshToken, "TTL": ttl});
        }else{
            return res
            .status(403)
            .json({"message": "Forbidden. Incorrect data" });
        }
      })
    })
    .catch(err =>{
      const error = new Error(err);
      error.httpStatusCode(500);
      return next(error)}
      );
};


//sends mock user data and request number in a separate field
//If the token is secured (its TTL time has expired), the response is 401 Unauthorised
exports.getMe = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const params = req.params.me;
    if(params.length ==3 && params[2] >= 0 && params[2] <=9){
      res.status(200).json({
          "request_num": params[2],
          "data": {
            "username": decoded.email
          }
        });
    }else{
      res.status(404).json({"message" : "Page not found"});
    }
    
  } catch(err) {
    res.status(401).json({" message": "Unauthorised" });
  }

};


//reissues a new access token
exports.refresh = (req, res, next) => {
  //catch refresh token
  const token = req.headers.authorization.split(' ')[1];
  findTokens()
  .then(data => {
    if(data['refreshToken'].localeCompare(token)===0){
      const ttl = getRandomTTL();
      const refreshToken = uuid();
      const token = jwt.sign({email: data['email']}, process.env.SECRET_KEY, {expiresIn: ttl });
      saveTokens({"user": "current", "refreshToken": refreshToken});
      return res.status(202).json({ "message": "New refresh token received", "accessToken": token, "refreshToken": refreshToken, "TTL": ttl});
    }else{
      return res.status(403).json({"message": "Forbidden. Incorrect data" });
    }
  })
};
