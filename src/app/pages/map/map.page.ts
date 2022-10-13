import { Component, OnInit } from '@angular/core';

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  mapa: any;
  marcador: any;
  buscar: any;
  directionsService = new google.maps.DirectionsService();
  directionsRenderer= new google.maps.DirectionsRenderer();

  ubicacionActual = { lat: 0, lng: 0 }

  constructor() { }

  async ngOnInit() {
    var ubi = await this.getMiPosicion();
    this.ubicacionActual.lat = ubi.coords.latitude;
    this.ubicacionActual.lng = ubi.coords.longitude;
    this.traerMapa();
    this.encontarUbicacion(this.mapa, this.marcador);
  }
  traerMapa() {
    var map: HTMLElement = document.getElementById('mapa');

    this.mapa = new google.maps.Map(map, {
      center: this.ubicacionActual,
      zoom: 18
    });

    this.directionsRenderer.setMap(this.mapa);
    var ordenes: HTMLElement = document.getElementById ('ordenes');
    this.directionsRenderer.setPanel(ordenes);

    this.marcador = new google.maps.Marker({
      position: this.ubicacionActual,
      map: this.mapa
    });
  }
  agMarcador() {
    this.marcador.setPosition(this.ubicacionActual);
    this.marcador.setMap(this.mapa);
  }
  encontarUbicacion(mapita,marcadorcito) {
    var autocompletar: HTMLElement = document.getElementById('autocompletar');
    const buscar = new google.maps.places.Autocomplete(autocompletar);
    this.buscar = buscar;

    buscar.addListener('place_changed', function(){
      var place = buscar.getPlace().geometry.location;
      mapita.setCenter(place);
      marcadorcito.setPosition(place);
    });
  }

  calculoRuta(){
    var place = this.buscar.getPlace().geometry.location;
    var ruta = {
      origin : this.ubicacionActual,
      destination:place,
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.directionsService.route(ruta,(respuesta, status)=>{
      this.directionsRenderer.setDirections(respuesta);
    });
    this.marcador.setPosition(null);
  }
   
    getMiPosicion(): Promise<any>{
    return new Promise(
      (resolve,reject)=>{
        navigator.geolocation.getCurrentPosition(resolve, reject);
        }
    );
  }
}
