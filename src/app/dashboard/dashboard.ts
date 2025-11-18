// src/app/dashboard/dashboard.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service'; // ✅ Usa directamente ApiService

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard {
  rutas: any[] = [];
  constructor(private apiService: ApiService) { // ✅ Inyecta ApiService directamente
    this.loadRutas();
  }

  loadRutas() {
    this.apiService.getRutas().subscribe(r => this.rutas = r || []);
  }

  verRecorrido(id: number) {
    window.dispatchEvent(new CustomEvent('selectRecorrido', { detail: id }));
  }

  iniciarRecorrido(payload: any) {
    this.apiService.iniciarRecorrido(payload).subscribe({ 
      next: () => alert('Recorrido iniciado'), 
      error: (e: any) => console.error(e) 
    });
  }

  finalizarRecorrido(id: number) {
    this.apiService.finalizarRecorrido(id).subscribe({ 
      next: () => alert('Recorrido finalizado'), 
      error: (e: any) => console.error(e) 
    });
  }
}