const express = require('express');
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const MobileDetect = require('mobile-detect');
const iplocation = require('iplocation')


const port = process.env.PORT || '3000';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/happin-local');

app.set('view engine' , 'pug');
app.use('/public/css', express.static(__dirname + '/public/css'));
app.use('/public/scripts', express.static(__dirname + '/public/scripts'));
app.use('/public/assets', express.static(__dirname + '/public/assets'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//========Authentication======
require('./controllers/auth')(app);

//========Sockets============
io.on('connection', (socket) => {
  //Request Sockets
  require('./sockets/request')(io, socket);
})

app.get('/', (req, res) => {
  const mapApiKey = 'AIzaSyCucitjj7AcVk8Hv35Pd6JVPQiNhzB8LwI';
  let md = new MobileDetect(req.headers['user-agent']);
  let userLocation = false;
  let userIp = req.ip;
  if (userIp.substr(0, 7) == "::ffff:") {
    userIp = userIp.substr(7)
  }
  if(userIp == '::1'){
    userLocation = {
      lat: 37.796152,
      lng: -122.404992
    }
  }
  console.log(userIp)
  iplocation(userIp, (error, loc) => {
    if(!userLocation){
      userLocation = {
        lat : loc.latitude,
        lng : loc.longitude
      }
    }
    console.log(userLocation);
    res.render('index', {
      mapApiKey : mapApiKey,
      mobile : md.mobile(),
      userLocation : userLocation
    });
  });

})

server.listen(port, () =>{
  console.log("Listening on port " + port);
})
