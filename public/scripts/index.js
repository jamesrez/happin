//============== GET USER LOCATION & Update Map ===================
initMap = () => {

  showMap = (pos) => {
    let map = new google.maps.Map(document.getElementById('map'), {
      center : pos,
      zoom: 15
    });
    let userLocation = new google.maps.Marker({
      position : pos,
      map : map
    });
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      $('#mapLoading').css('display', 'none');
      $('#map').css('display' , 'block');
      showMap(pos);
    }, function(err) {
      let examplePos = {
        lat: 37.796152,
        lng: -122.404992
      }
      $('#mapLoading').css('display', 'none');
      $('#map').css('display' , 'block');
      showMap(examplePos);
    });
  } else {
    // Browser doesn't support Geolocation
    console.log("No geo");
  }

}

$(document).ready(() => {

  //=====CONNECT TO SOCKET=======
  let socket = io.connect();





//=======BUTTONS=======

  $('.newRequestBtn').click(() => {
    $('.mapContainer').css('display', 'none');
    $('.requestFormContainer').css('display', 'flex');
    $('.requestForm').css('display', 'flex');
  });

  $('#newRequestSubmit').click(() => {
    let newRequestData = {
      title : $('#newRequestTitle').val(),
      body : $('#newRequestBody').val(),
      payout : $('#newRequestPay').val()
    };
    socket.emit('New Request', newRequestData)
  });



  //Socket Handlers
  socket.on('New Request', (d) => {

  })

})
