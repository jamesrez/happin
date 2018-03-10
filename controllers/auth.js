const User = require('../models/User');
module.exports = (app) => {

  app.post('/register', (req, res) => {
    User.findOne({username : req.body.username}, (err, user) => {
      if(user){
        res.send({err : "User Already Exists"});
      }else{
        let newUser = new User({username : req.body.username});
        newUser.password = newUser.generateHash(req.body.password);
        newUser.save((err, user) => {
          res.send({user: user});
        });
      }
    })
  });

  app.post('/login', (req, res) => {
    User.findOne({username : req.body.username}, (err, user) => {
      if(!user){
        res.send({err : "No User with username : " + req.body.username});
      }
      else if(!user.validPassword(req.body.password)){
        res.send({err : "Incorrect Password"});
      }
      else{
        res.send({user : user});
      }
    })
  })

}
