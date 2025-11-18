// src/app/mapa/mapa.ts
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Añade esta línea
import * as L from 'leaflet';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [CommonModule], // ✅ Ahora sí está definido
  templateUrl: './mapa.html',
  styleUrls: ['./mapa.scss']
})
export class MapaComponent implements OnInit, AfterViewInit {
  // ... resto del código igual
}
export class MapaComponent implements OnInit, AfterViewInit {
  private map!: L.Map;
  private markerLayer!: L.LayerGroup;
  private polylineLayer!: L.LayerGroup;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.initMap();
    this.loadMapData();
  }

  private initMap(): void {
    const lat = 10.9685;
    const lng = -74.7813;

    this.map = L.map('map').setView([lat, lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

    this.markerLayer = L.layerGroup().addTo(this.map);
    this.polylineLayer = L.layerGroup().addTo(this.map);
  }

  private loadMapData(): void {
    this.apiService.getRecorridos().subscribe(recorridos => {
      recorridos.forEach((recorrido: any) => {
        this.apiService.getPosicionesDeRecorrido(recorrido.id).subscribe(posiciones => {
          if (posiciones.length > 0) {
            const coords = posiciones.map((p: any) => [p.latitud, p.longitud]);
            const polyline = L.polyline(coords, { color: 'blue' }).addTo(this.polylineLayer);
            polyline.bindPopup(`<b>Recorrido ID: ${recorrido.id}</b><br>Puntos: ${coords.length}`).openPopup();

            const lastPos = posiciones[posiciones.length - 1];
            L.marker([lastPos.latitud, lastPos.longitud], {
              icon: L.icon({
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34]
              })
            })
            .addTo(this.markerLayer)
            .bindPopup(`
              <b>📍 Vehículo en movimiento</b><br>
              Recorrido: ${recorrido.id}<br>
              Lat: ${lastPos.latitud}<br>
              Lng: ${lastPos.longitud}
            `);
          }
        });
      });
    });

    this.apiService.getCalles().subscribe(calles => {
      calles.forEach((calle: any) => {
        if (calle.latitud && calle.longitud) {
          L.marker([calle.latitud, calle.longitud], {
            icon: L.divIcon({
              className: 'custom-div-icon',
              html: `<div style="background-color:#ffcc00; border-radius:50%; width:12px; height:12px; border:2px solid #333;"></div>`
            })
          }).addTo(this.map).bindPopup(`Calle: ${calle.nombre}`);
        }
      });
    });
  }
}