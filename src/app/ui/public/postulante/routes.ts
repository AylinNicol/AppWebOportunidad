import { Routes } from '@angular/router';

export const PostulanteRoutes: Routes = [
  {
    path: 'mi-panel',
    loadComponent: () =>
      import('./pages/dashboard/container/component').then((m) => m.PostulanteDashboardComponent),
  },
  {
    path: 'mi-perfil',
    loadComponent: () =>
      import('./pages/perfil/container/component').then((m) => m.PostulantePerfilComponent),
  },
  {
    path: 'mis-postulaciones',
    loadComponent: () =>
      import('./pages/postulaciones/container/component').then(
        (m) => m.PostulantePostulacionesComponent,
      ),
  },
];
