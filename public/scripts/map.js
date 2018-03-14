
showMap = (pos) => {
  console.log(pos);
  let map = new google.maps.Map(document.getElementById('map'), {
    center : pos,
    zoom: 15
  });
  let userLocation = new google.maps.Marker({
    position : pos,
    map : map
  })
}


initMap = () => {
//================START MAP AT USER's CURRENT LOCATION===========
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      $('#mapLoading').css('display', 'none');
      $('#map').css('display' , 'block');
      showMap(pos);
    }, function(pos) {
    });
  } else {
    // Browser doesn't support Geolocation
  }
}
