
showMap = (pos) => {
  console.log(pos);
  let map = new google.maps.Map(document.getElementById('map'), {
    center : pos,
    zoom: 15
  });
  let infoWindow = new google.maps.InfoWindow;
}


initMap = () => {
//================START MAP AT USER's CURRENT LOCATION===========
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      showMap(pos);
    }, function(pos) {
      showMap(pos);
    });
  } else {
    // Browser doesn't support Geolocation
  }
}