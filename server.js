const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const port = process.env.PORT || '3000';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/happin-local');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//========Authentication======
require('./controllers/auth')(app);



app.get('/', (req, res) => {
  res.send("Happin");
})

app.listen(port, () =>{
  console.log("Listening on port " + port);
})
