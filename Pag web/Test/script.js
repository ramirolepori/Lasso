function iniciarMap(){
    var coord = {lat:-34.5956145 ,lng: -58.4431949};
    var map = new google.maps.Map(document.getElementById('map'),{
      zoom: 10,
      center: coord
    });
    var marker = new google.maps.Marker({
      position: coord,
      map: map
    });
    var marker = new google.maps.Marker({
      position: {lat:-34.5966145 ,lng: -58.4421949},
      map: map
    });
    var marker = new google.maps.Marker({
      position: {lat:-33.5966145 ,lng: -58.4421949},
      map: map
    });
}