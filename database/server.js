let express = require('express');
let server = express();
// let bd = require('body-parser');
let bcrypt = require('bcryptjs');
var cors = require('cors');
let config = require('config');
let jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');

// let cookie = require('cookie-parser');
// let session = require('express-session');
// let pasport = require('passport');
// let anthentication = require('./authntication');
let User = require('./db/user');
server.use(cors());
server.use(express.json());
// server.use(bd.urlencoded());
// server.use(cookie());
// server.use(
//   session({
//     secret: 'secret'
//   })
// );

// server.use(pasport.initialize());
// server.use(pasport.session());

let users = [];
server.post('/login', function(req, res) {
  // let userFound = users.find(user => {
  //   return user.email == req.body.email && user.password == req.body.password;
  // });
  // if (!userFound) {
  //   res.status(400).json({
  //     success: false,
  //   });
  // } else {
  //   res.json({
  //     success: true,
  //   });
  // }
  const { email, password } = req.body;
  //simple validation
  if (!email || !password) {
    return res.status(400).json({
      msg: 'please enter all fields'
    });
  }
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: 'User does not exist' });
    //validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: 'invalid credentials' });
      jwt.sign(
        {
          id: user.id,
          email: user.email,
          amount: user.amount,
          username: user.username
        },
        'JwtSecret',
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              user: user.id,
              email: user.email,
              amount: user.amount,
              username: user.username
            },
            success: true
          });
        }
      );
    });
  });
});
server.get('/authUser', auth, function(req, res) {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});
server.post('/signup', function(req, res) {
  console.log(req.body);
  users.push(req.body);
  const { username, email, password, amount } = req.body;
  //simple validation
  if (!username || !email || !password || !amount) {
    return res.status(400).json({
      msg: 'please enter all fields'
    });
  }
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: 'User already exist' });
  });
  const newUser = new User({
    username,
    amount,
    email,
    password
  });
  //create salt and hash
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save().then(user => {
        jwt.sign(
          { id: user.id },
          'JwtSecret',
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user.id,
                username: user.username,
                amount: user.amount,
                email: user.email
              },
              success: true
              // msg: 'user created'
            });
          }
        );
      });
    });
  });
  // let user = new User(req.body);
  // user.save(function(err, user) {
  //   res.json({
  //     message: err ? err.message : '',
  //     success: err ? false : true,
  //     user
  //   });
  // });
});
const port = process.env.PORT || 6000;
server.listen(port, function() {
  console.log('server started on port 6000');
});
