
const elemento_mapa = document.getElementById("google_canvas");
google.maps.event.addDomListener(window, 'load', dibujarMapa);
var marcador_tiempo_real, mapa;

function dibujarMapa(){
    var opcionesMapa = {zoom: 15, mapTypeId: google.maps.MapTypeId.ROADMAP}
    mapa = new google.maps.Map(elemento_mapa, opcionesMapa);

    navigator.geolocation.getCurrentPosition(function(posicion){
        var geolocalizacion = new google.maps.LatLng(posicion.coords.latitude, posicion.coords.longitude);
        var marcador = new google.maps.Marker({
            map: mapa,
            position: geolocalizacion,
            visible: true,
            icon: "./img/pokepunto.png"
        });
        marcador_tiempo_real = new google.maps.Marker({
            map: mapa,
            position: geolocalizacion,
            visible: true,
            icon: "./img/pokepunto.png"
        });
        mapa.setCenter(geolocalizacion);
        navigator.geolocation.watchPosition(actualizarPosicion, function(){}, {maximumAge: 0});
    }, function(){});
}

function actualizarPosicion(posicion){
    var geolocalizacion = new google.maps.LatLng(posicion.coords.latitude, posicion.coords.longitude);
    marcador_tiempo_real.setPosition(geolocalizacion);
    mapa.setCenter(geolocalizacion);
}
