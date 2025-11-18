import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
@Injectable({ providedIn: 'root' })
export class VehiculosService {
  constructor(private api: ApiService) {}
  listar(){ return this.api.get('/vehiculos'); }
  obtener(id:number){ return this.api.get(`/vehiculos/${id}`); }
}
