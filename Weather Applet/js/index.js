var geocoder; 
var latitude; 
var longitude; 
var temp; 
var isCelsius = true;  

function initMaps(){
  geocoder = new google.maps.Geocoder()
}

function getGeolocation(){ 
  if ("geolocation" in navigator) {       navigator.geolocation.getCurrentPosition(function(position) {
    latitude = position.coords.latitude; 
    longitude = position.coords.longitude; 
    
    getLocation();
    getWeather();
});
  }
}
function getLocation(){
  var location = new google.maps.LatLng(latitude, longitude); 
  geocoder.geocode({'latLng': location}, function(results, status){
    if (status == google.maps.GeocoderStatus.OK){
      if(results[0]){
        var add = results[0];
        var city = add.address_components[2].long_name;
        var country = add.address_components[5].long_name; 
   
        displayLocation(country, city);
      }
    }
  }
  );
 }
function displayLocation(country, city){
  $(info1).html(city + ",");
  $(info2).html(country);
}
function getWeather(){
  var lat = latitude; 
  var lon = longitude; 
  
  $.get("https://fcc-weather-api.glitch.me/api/current?lat=" +lat+"&lon="+lon+"&appid=7484b042c0ab730b3566e4e80de0a887", function(forecast) { 
    getTemp(forecast);
    var weather = forecast.weather[0].main
    if(weather == "Clouds"){
      var clouds = '<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>';
      $(".container").append(clouds);    
    }
    else if(weather == "Clear"){
      var clear = '<div class="icon sunny"><div class="sun"><div class="rays"></div></div></div>';
      $(".container").append(clear); 
    }
    else if(weather == "Drizzle"){
      var drizzle = '<div class="icon sun-shower"><div class="cloud"></div><div class="sun"><div class="rays"></div></div><div class="rain"></div></div>';
      $(".container").append(drizzle);
    }
    else if(weather == "Rain"){
      var rain = '<div class="icon rainy"><div class="cloud"></div><div class="rain"></div></div>';
      $(".container").append(rain);
    }
    else if(weather == "Thunderstorm"){
      var thunderstorm = '<div class="icon thunder-storm"><div class="cloud"></div><div class="lightning"><div class="bolt"></div><div class="bolt"></div></div></div>';
      $(".container").append(thunderstorm);
    }
    else if (weather == "Snow"){
      var snow = '<div class="icon flurries"><div class="cloud"></div><div class="snow"><div class="flake"></div><div class="flake"></div></div</div>';
      $(".container").append(snow);
    }
    else{
      console.log("I need an image for: " + weather);
    }
  });
}

function getTemp(forecast){
  temp = forecast.main.temp;
  $("#temp").html(Math.round(forecast.main.temp));
} 

function loading(){
  jQuery.ajaxSetup({
  beforeSend: function() {
    $('#loading').show();
  },
  complete: function(){
    $('#loading').hide();
    $("#measure").html("&#8451");
  },
  success: function() {}
  });
}

$(document).ready(function(){
  loading();
  initMaps(); 
  getGeolocation();
});

 $("#measure").click(function(){
   if(isCelsius == true){
     var f = Math.round(temp) * 9 / 5 +  32;
     $("#temp").html(Math.round(f)); 
     $("#measure").html("&#8457");
     isCelsius = false;  
    }
   
   else{
     $("#temp").html(Math.round(temp)); 
     $("#measure").html("&#8451")
     isCelsius = true;       
   } 
 });