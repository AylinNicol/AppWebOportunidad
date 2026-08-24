import { Routes } from '@angular/router';

export const AdminRoutes: Routes = [
  {
    path: '',
    title: 'Dashboard | Administración',
    loadComponent: () =>
      import('./pages/dashboard/container/component').then((m) => m.AdminDashboardComponent),
  },
  {
    path: 'oportunidades',
    title: 'Oportunidades | Administración',
    loadComponent: () =>
      import('./pages/oportunidades/container/component').then(
        (m) => m.AdminOportunidadesComponent,
      ),
  },
  {
    path: 'usuarios',
    title: 'Usuarios | Administración',
    loadComponent: () =>
      import('./pages/usuarios/container/component').then((m) => m.AdminUsuariosComponent),
  },
  {
    path: 'publicaciones',
    title: 'Publicaciones | Administración',
    loadComponent: () =>
      import('./pages/publicaciones/container/component').then(
        (m) => m.AdminPublicacionesComponent,
      ),
  },
];
