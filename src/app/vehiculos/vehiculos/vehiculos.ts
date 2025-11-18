// src/app/vehiculos/vehiculos.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-vehiculos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehiculos.html',
  styleUrls: ['./vehiculos.scss']
})
export class VehiculosComponent implements OnInit {
  vehiculos: any[] = [];
  nuevoVehiculo: any = { placa: '', modelo: '', perfil_id: 1 };

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.cargarVehiculos();
  }

  cargarVehiculos(): void {
    this.apiService.getVehiculos().subscribe(data => {
      this.vehiculos = data;
    });
  }

  crearVehiculo(): void {
    if (this.nuevoVehiculo.placa.trim()) {
      this.apiService.createVehiculo(this.nuevoVehiculo).subscribe(() => {
        this.cargarVehiculos();
        this.nuevoVehiculo = { placa: '', modelo: '', perfil_id: 1 };
      });
    }
  }

  eliminarVehiculo(id: number): void {
    if (confirm('¿Estás seguro de eliminar este vehículo?')) {
      this.apiService.deleteVehiculo(id).subscribe(() => {
        this.cargarVehiculos();
      });
    }
  }
}