let config = require('config');
let jwt = require('jsonwebtoken');

function auth(req,res,next){
    const token = req.header('x-auth-token');
    //check for token
    if(!token) res.status(401).json({msg:'No token, authorization is denied'})
  try{
      // verify token 
      const decoded = jwt.verify(token,'JwtSecret');
      //add user from payload
      req.user = decoded;
      next();
  }catch(e){
res.status(400).json({msg:'token is not valid'});
  }
}
module.exports = auth;