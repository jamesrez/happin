initMap = () => {


  getLocation = (cb) => {
    $.getJSON("https://freegeoip.net/json/", function(data) {
      let pos = {
        lat : data.latitude,
        lng : data.longitude
      }
      cb(pos);
    });
  }

  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(function(position){
  //     pos = {
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude
  //     };
  //     $('#mapLoading').css('display', 'none');
  //     $('#map').css('display' , 'block');
  //     showMap(pos);
  //   // }, function(err) {
  //   //   // let examplePos = {
  //   //   //   lat: 37.796152,
  //   //   //   lng: -122.404992
  //   //   // }
  //   //   // $('#mapLoading').css('display', 'none');
  //   //   // $('#map').css('display' , 'block');
  //   //   // showMap(examplePos);
  //   });
  // } else {
  //   // Browser doesn't support Geolocation
  //   console.log("No geo");
  // }

  // $.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBDPiZQRAopncSA6oAdW6bZQ5AufZNPVz0', (data) => {
    getLocation((pos) => {
      $('#mapLoading').css('display', 'none');
      $('#map').css('display' , 'block');
      console.log(pos);
      let map = new google.maps.Map(document.getElementById('map'), {
        center : pos,
        zoom: 15
      });
      let userLocation = new google.maps.Marker({
        position : pos,
        map : map
      });
    });


}
