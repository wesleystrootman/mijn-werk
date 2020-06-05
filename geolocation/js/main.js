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

var markers = [];
var map;
var API_KEY = "PRIVATE";
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
    var target = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
    };

    map = new google.maps.Map(divMap, {
        center:target,
        zoom: 16
    });

    makeMarker(target, 'Ik' );
    getSavedMarkers();

}

var search = document.querySelector('#search');

search.addEventListener("click", function (ev) {
    ev.preventDefault();
    showPlace();
},false);

var add = document.querySelector('#add');

add.addEventListener("click", function (ev) {
    ev.preventDefault();
    savePlace();
}, false);

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


            var long = locJson.results[0].geometry.location.lng;
            var longfield = document.querySelector('#longitude');
            longfield.focus();
            longfield.value = long;

            map.panTo(pos);

            var lat = locJson.results[0].geometry.location.lat;
            var latfield = document.querySelector('#latitude');
            latfield.focus();
            latfield.value = lat;

        });

}

function makeMarker(pos, beschrijving){
    var marker = new google.maps.Marker({
        position: pos,
        map:map,
        title:beschrijving,
    });


    markers.push({
        "title": beschrijving,
        "pos": pos
    });
}

function savePlace() {
    var  beschrijving = document.querySelector('#beschrijving').value;
    var latfield = Number(document.querySelector('#latitude').value);


    var longfield = Number(document.querySelector('#longitude').value);

    console.log(latfield, longfield);
    var pos = {
        lat: latfield,
        lng: longfield,
    };


   makeMarker(pos, beschrijving);
   console.log(markers);
   localStorage.setItem('MarkersList', JSON.stringify(markers));

}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function clearMarkers() {
    setMapOnAll(null);
}

var clear = document.querySelector('#clear');
clear.addEventListener("click", function (ev) {
    ev.preventDefault();
    clearMap();
}, false);

function clearMap() {
    markers = [];
    localStorage.clear();
    location.reload();
}

function getSavedMarkers(){
    var savedMarkers = JSON.parse(localStorage.getItem("MarkersList"));
    if(savedMarkers.length > 0){
        savedMarkers.forEach(function (marker) {
            var beschrijving = marker.title;
            var pos = marker.pos;

            showMarkers(pos, beschrijving);
            console.log(pos, beschrijving);
        });
    }
}

function showMarkers(pos, beschrijving) {

    var target = {
        lat: pos.lat,
        lng: pos.lng,
    };

    makeMarker(target, beschrijving);
}


