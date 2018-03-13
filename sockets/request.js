const Request = require('../models/Request');
module.exports = (io, socket) => {

  socket.on("New Request", (d) => {
    let newRequest = new Request({
      title : d.title,
      body : d.body,
      owner : d.owner,
      location : {
        lat : d.lat,
        lon : d.lon
      }
    });
    socket.emit("New Request", newRequest);
    console.log("New Request: " + newRequest);
    newRequest.save();
  });

  socket.on("New Helper", (d) => {
    Request.findById(d.requestId, (err, request) => {
      if(!request){
        res.send({err : "Request Not Found"});
      }else{
        let newHelper = {
          username : d.username,
          location : {
            lat : d.lat,
            lon : d.lon
          }
        }
        request.helpers.push(newHelper);
        console.log("New Helper: " + d.username);
        socket.emit("New Helper", newHelper);
        request.save();
      }
    });
  })



}
