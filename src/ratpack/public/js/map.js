var getBoundingBoxForPath = function(path) {
    var north = Math.max.apply(null, path.map(function(a) {return a.H;}));
    var east  = Math.max.apply(null, path.map(function(a) {return a.L;}));
    var south = Math.min.apply(null, path.map(function(a) {return a.H;}));
    var west  = Math.min.apply(null, path.map(function(a) {return a.L;}));

    return new google.maps.LatLngBounds(new google.maps.LatLng(south, west), new google.maps.LatLng(north, east));
}

var addPathToElementAsMap = function(element, encodedPath) {
    var decodedPath = google.maps.geometry.encoding.decodePath(encodedPath);

    var map = new google.maps.Map(element, { mapTypeId: google.maps.MapTypeId.TERRAIN });
    map.fitBounds(getBoundingBoxForPath(decodedPath));

    var setRegion = new google.maps.Polyline({
        path: decodedPath,
        strokeColor: "#F00",
        strokeOpacity: 1.0,
        strokeWeight: 2,
        map: map
    });
}
