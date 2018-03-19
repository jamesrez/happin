initMap = () => {

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

  $.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCucitjj7AcVk8Hv35Pd6JVPQiNhzB8LwI',
  (data) => {
    $('#mapLoading').css('display', 'none');
    $('#map').css('display' , 'block');
    let map = new google.maps.Map(document.getElementById('map'), {
      center : data.location,
      zoom: 15
    });
    let userLocation = new google.maps.Marker({
      position : data.location,
      map : map
    });
  })

}
