import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecorridosService {
  constructor(private api: ApiService) {}
  iniciar(data:any){ return this.api.post('/recorridos/iniciar', data); }
  finalizar(recorridoId:number){ return this.api.post(`/recorridos/${recorridoId}/finalizar`, {}); }
  posiciones(recorridoId:number): Observable<any> { return this.api.get(`/recorridos/${recorridoId}/posiciones`); }
}
