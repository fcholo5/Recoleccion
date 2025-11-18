// src/app/rutas/rutas.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-rutas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rutas.html',
  styleUrls: ['./rutas.scss']
})
export class RutasComponent implements OnInit {
  rutas: any[] = [];
  nuevaRuta: any = { nombre: '', descripcion: '' };

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.cargarRutas();
  }

  cargarRutas(): void {
    this.apiService.getRutas().subscribe(data => {
      this.rutas = data;
    });
  }

  crearRuta(): void {
    if (this.nuevaRuta.nombre.trim()) {
      this.apiService.createRuta(this.nuevaRuta).subscribe(() => {
        this.cargarRutas();
        this.nuevaRuta = { nombre: '', descripcion: '' };
      });
    }
  }

  eliminarRuta(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta ruta?')) {
      this.apiService.deleteRuta(id).subscribe(() => {
        this.cargarRutas();
      });
    }
  }
}