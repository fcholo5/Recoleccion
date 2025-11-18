// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = 'http://apirecoleccion.gonzaloandreslucio.com/api';

  constructor(private http: HttpClient) {}

  // Calles
  getCalles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/calles`);
  }

  // Vehículos
  getVehiculos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/vehiculos`);
  }

  createVehiculo(vehiculo: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/vehiculos`, vehiculo);
  }

  deleteVehiculo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/vehiculos/${id}`);
  }

  // Rutas
  getRutas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/rutas`);
  }

  createRuta(ruta: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/rutas`, ruta);
  }

  deleteRuta(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/rutas/${id}`);
  }

  // Recorridos
  getRecorridos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/misrecorridos`);
  }

  iniciarRecorrido(recorrido: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/recorridos/iniciar`, recorrido);
  }

  finalizarRecorrido(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/recorridos/${id}/finalizar`, {});
  }

  // Posiciones
  getPosicionesDeRecorrido(recorridoId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/recorridos/${recorridoId}/posiciones`);
  }

  registrarPosicion(recorridoId: number, posicion: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/recorridos/${recorridoId}/posiciones`, posicion);
  }
}