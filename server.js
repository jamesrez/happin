const express = require('express');
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const MobileDetect = require('mobile-detect');


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
  res.render('index', {
    mapApiKey : mapApiKey,
    mobile : md.mobile()
  });
});

server.listen(port, () =>{
  console.log("Listening on port " + port);
})
