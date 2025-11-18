import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RutasService {
  constructor(private api: ApiService) {}
  listarPorPerfil(): Observable<any> { return this.api.get('/rutas'); }
  obtener(id:number) { return this.api.get(`/rutas/${id}`); }
  crear(payload:any){ return this.api.post('/rutas', payload); }
}
