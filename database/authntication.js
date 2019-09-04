// let passportLocal = require('passport-local').Strategy;
// let passport = require('passport');
// let User = require('./db/user');
// let ourStrategy = new passportLocal({
// usernameField:'username',
// },(username,password,next)=>{
//     User.findOne({
//         username:username,
//         password:password,
//     },(err,userFound)=>{
// if(userFound){
//     console.log('user is authorized to enter');
//     next(null,userFound);
// }else{
//     next(null,undefined);
// }

//     })
    
// })
// passport.use(ourStrategy);
// console.log('authentication is enable')