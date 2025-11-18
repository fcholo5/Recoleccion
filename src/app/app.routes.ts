import { Routes } from '@angular/router';
// ✅ Asegúrate de que los nombres de los archivos coincidan EXACTAMENTE

// Pero espera: si tus archivos se llaman `dashboard.ts` (sin .component), usa:
import { DashboardComponent } from './dashboard/dashboard';
import { MapaComponent } from './mapa/mapa';
import { RutasComponent } from './rutas/rutas';
import { VehiculosComponent } from './vehiculos/vehiculos';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'mapa', component: MapaComponent },
  { path: 'rutas', component: RutasComponent },
  { path: 'vehiculos', component: VehiculosComponent },
];