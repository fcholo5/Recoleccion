import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { RecorridosService } from '../services/recorridos.service';
import { RutasService } from '../services/rutas.service';
import { VehiculosService } from '../services/vehiculos.service';
import { interval, Subscription, switchMap } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './mapa.html',
  styleUrls: ['./mapa.scss']
})
export class Mapa implements OnInit, OnDestroy {
  map!: L.Map;
  markersLayer = L.layerGroup();
  recorridoLayer = L.layerGroup();
  pollSub?: Subscription;
  selectedRecorridoId: number | null = null;

  constructor(
    private recorridosSvc: RecorridosService,
    private rutasSvc: RutasService,
    private vehiculosSvc: VehiculosService
  ) {}

  ngOnInit() {
    this.initMap();
    this.loadRutas();
    // polling cada 5s
    this.pollSub = interval(5000).pipe(
      switchMap(() => {
        if (this.selectedRecorridoId) {
          return this.recorridosSvc.posiciones(this.selectedRecorridoId);
        } else {
          return this.vehiculosSvc.listar();
        }
      })
    ).subscribe({
      next: data => this.handlePollingData(data),
      error: err => console.error('polling error', err)
    });

    // escuchar evento desde dashboard para seleccionar recorrido
    window.addEventListener('selectRecorrido', (ev:any) => {
      this.selectRecorrido(ev.detail);
    });
  }

  ngOnDestroy() {
    this.pollSub?.unsubscribe();
    this.map?.remove();
  }

  initMap() {
    this.map = L.map('map', { center: [3.8772, -77.0446], zoom: 12 });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(this.map);
    this.markersLayer.addTo(this.map);
    this.recorridoLayer.addTo(this.map);
  }

  loadRutas() {
    this.rutasSvc.listarPorPerfil().subscribe({
      next: (resp:any) => {
        if (Array.isArray(resp)) {
          resp.forEach((r:any) => {
            if (r.geometry) {
              try {
                const coords = r.geometry.map((c:any)=>[c.lat,c.lng]);
                L.polyline(coords, { weight: 4 }).addTo(this.recorridoLayer);
              } catch(e){}
            }
          });
        }
      },
      error: e => console.error(e)
    });
  }

  handlePollingData(data:any) {
    this.markersLayer.clearLayers();
    this.recorridoLayer.clearLayers();
    if (Array.isArray(data) && data.length && data[0].lat !== undefined) {
      const coords = data.map((p:any) => [p.lat, p.lng]);
      L.polyline(coords, { color: 'blue' }).addTo(this.recorridoLayer);
      data.forEach((p:any) => {
        const m = L.circleMarker([p.lat, p.lng], { radius: 5 });
        m.bindPopup(`Hora: ${p.created_at || p.ts || ''}`);
        m.addTo(this.markersLayer);
      });
    } else if (Array.isArray(data)) {
      data.forEach((v:any) => {
        if (v.lat && v.lng) {
          const mk = L.marker([v.lat, v.lng]);
          mk.bindPopup(`<b>${v.placa || v.name || 'Vehículo'}</b>`);
          mk.addTo(this.markersLayer);
        }
      });
    }
  }

  selectRecorrido(id:number) {
    this.selectedRecorridoId = id;
    this.recorridosSvc.posiciones(id).subscribe({ next: d => this.handlePollingData(d), error: e => console.error(e) });
  }
}
