const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.send(401).json({"message":"Unauthorised"});
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) return res.status(401).json({"message": "Unauthorised. Token expired"});
      req.user = user;
      next();
    })
}

module.exports = {authenticateToken};