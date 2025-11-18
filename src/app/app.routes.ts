import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./login/login').then(m => m.Login)
  },

  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard').then(m => m.Dashboard)
  },

  {
    path: 'mapa',
    loadComponent: () =>
      import('./mapa/mapa').then(m => m.Mapa)
  },

  {
    path: 'rutas',
    loadComponent: () =>
      import('./rutas/rutas').then(m => m.Rutas)
  }
];
