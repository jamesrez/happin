//============== GET USER LOCATION & Update Map ===================
// let pos;
// initMap = () => {
//
//   showMap = (pos) => {
//     let map = new google.maps.Map(document.getElementById('map'), {
//       center : {
//         lat: 37.796152,
//         lng: -122.404992
//       },
//       zoom: 15
//     });
//     let userLocation = new google.maps.Marker({
//       position : {
//         lat: 37.796152,
//         lng: -122.404992
//       },
//       map : map
//     });
//   }
  //
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     pos = {
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude
  //     };
  //     $('#mapLoading').css('display', 'none');
  //     $('#map').css('display' , 'block');
  //     showMap(pos);
  //   }, function(err) {
  //     let examplePos = {
  //       lat: 37.796152,
  //       lng: -122.404992
  //     }
  //     $('#mapLoading').css('display', 'none');
  //     $('#map').css('display' , 'block');
  //     showMap(examplePos);
  //   });
  // } else {
  //   // Browser doesn't support Geolocation
  //   console.log("No geo");
  // }
//}


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
      payout : $('#newRequestPay').val(),
      location : pos
    };
    socket.emit('New Request', newRequestData)
  });

  //Update Near Requests
  addNewRequest = (request) => {
    let newRequestClone = $('.request-prototype').clone(true);
    newRequestClone.addClass('request').removeClass('request-prototype');
    newRequestClone.find('#requestTitle').text(request.title);
    newRequestClone.find('#requestPayout').text('$'+request.payout);
    newRequestClone.appendTo('.requestsContainer');
  }

  //Socket Handlers
  socket.on('New Request', (d) => {
    addNewRequest(d);
  })

})
