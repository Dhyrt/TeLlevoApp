import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

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
  directionsRenderer = new google.maps.DirectionsRenderer();

  ubicacionActual = { lat: 0, lng: 0 }
  ubicacionDuoc =  { lat:-33.597835629011804, lng:-70.57911395425506}

  rut: string;
  usuario : any;
  KEY_HUMANOS = 'humanos';

  constructor(private router: Router, private loading: LoadingController, private activatedRoute: ActivatedRoute, private storage: StorageService) { }

  async ngOnInit() {
    this.rut = this.activatedRoute.snapshot.paramMap.get('rut');
    this.usuario = this.storage.getInfo(this.KEY_HUMANOS, this.rut);
    console.table(this.usuario);
    var ubi = await this.getMiPosicion();
    this.ubicacionActual.lat = ubi.coords.latitude;
    this.ubicacionActual.lng = ubi.coords.longitude;
    this.traerMapa();
    this.encontarUbicacion(this.mapa, this.marcador);
  }

  traerMapa() {
    var map: HTMLElement = document.getElementById('mapa');

    this.mapa = new google.maps.Map(map, {
      styles:[
        {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#d6e2e6"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#cfd4d5"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#7492a8"
                }
            ]
        },
        {
            "featureType": "administrative.neighborhood",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "lightness": 25
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#dde2e3"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#cfd4d5"
                }
            ]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#dde2e3"
                }
            ]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#7492a8"
                }
            ]
        },
        {
            "featureType": "landscape.natural.terrain",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#dde2e3"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#588ca4"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "saturation": -100
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#a9de83"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#bae6a1"
                }
            ]
        },
        {
            "featureType": "poi.sports_complex",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#c6e8b3"
                }
            ]
        },
        {
            "featureType": "poi.sports_complex",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#bae6a1"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#41626b"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "saturation": -45
                },
                {
                    "lightness": 10
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#c1d1d6"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#a6b5bb"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#9fb6bd"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "saturation": -70
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#b4cbd4"
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#588ca4"
                }
            ]
        },
        {
            "featureType": "transit.station",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#008cb5"
                }
            ]
        },
        {
            "featureType": "transit.station.airport",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": -5
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#a6cbe3"
                }
            ]
        }
    ],
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
  async salir() {
    await this.storage.logout();
    }

}
