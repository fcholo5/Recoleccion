import { Routes } from '@angular/router';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // LOGIN
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login').then(m => m.Login)
  },

  // DASHBOARD
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard').then(m => m.DashboardComponent)
  },

  // RUTAS HIJAS DEL DASHBOARD
  {
    path: 'dashboard',
    children: [
      {
        path: 'mapa',
        loadComponent: () =>
          import('./mapa/mapa/mapa').then(m => m.Mapa)
      },
      {
        path: 'rutas',
        loadComponent: () =>
          import('./rutas/rutas/rutas').then(m => m.Rutas)
      },
      {
        path: 'vehiculos',
        loadComponent: () =>
          import('./vehiculos/vehiculos/vehiculos').then(m => m.Vehiculos)
      },
      {
        path: 'notificaciones',
        loadComponent: () =>
          import('./notificaciones/notificaciones/notificaciones').then(m => m.Notificaciones)
      },
      {
        path: 'usuarios',
        loadComponent: () =>
          import('./usuarios/usuarios/usuarios').then(m => m.Usuarios)
      },

      { path: '', redirectTo: 'mapa', pathMatch: 'full' }
    ]
  }
];
