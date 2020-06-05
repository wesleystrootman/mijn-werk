var posOptions =     { enableHighAccuracy: false,
    maximumAge: 0,
    timeout: 5000
};

/**  * Get the current location of the user  */
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showLocation, handleError, posOptions);
    } else {
        console.log ('Not supported');
    }
}

/**  * Show current location coords of the user  *
 *  @param position object with position info  */
function showLocation(position) {
    console.log(position.coords.latitude, position.coords.longitude );
}

function handleError(error) {
    console.log(error.code, error.message );
}



getLocation();

var marker;
var map;
var API_KEY = "AIzaSyBHlzEXk1cGO65POSXz_AYW2DDmKuF6Fv4";
var mapScript = document.createElement('script');
mapScript.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key='+API_KEY+'&callback=initMap' );
mapScript.setAttribute('async', '' );
mapScript.setAttribute('defer', '' );
document.querySelector('body').appendChild(mapScript);
function initMap() {
    navigator.geolocation.getCurrentPosition(showMap, handleError);
}

var divMap = document.querySelector(".divmap");
function showMap(pos) {
    divMap.style.width = '500px';
    divMap.style.height = '500px';
    map = new google.maps.Map(divMap, {
        center:{
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
        },
        zoom: 16
    });

     marker = new google.maps.Marker({
        position: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,},
        map:map,
        title:"Hello World!"
    });

}

var search = document.querySelector('#search');

search.addEventListener("click", function (ev) {
    ev.preventDefault();
    showPlace();
},false);

function showPlace() {
    var loc = document.querySelector('#place');
    console.log(loc.value);

    var reqUrl = "https://maps.googleapis.com/maps/api/geocode/json?address="+loc.value+"&key="+API_KEY;

    fetch(reqUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function (locJson) {
            console.log(locJson);
            var pos = locJson.results[0].geometry.location;
            map.panTo(pos);
            marker.setPosition(pos);

        });

}



