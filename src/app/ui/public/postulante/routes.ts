import { Routes } from '@angular/router';

export const PostulanteRoutes: Routes = [
  {
    path: 'mi-panel',
    title: 'Mi panel | Conecta Oportunidades',
    loadComponent: () =>
      import('./pages/dashboard/container/component').then((m) => m.PostulanteDashboardComponent),
  },
  {
    path: 'mi-perfil',
    title: 'Mi perfil | Conecta Oportunidades',
    loadComponent: () =>
      import('./pages/perfil/container/component').then((m) => m.PostulantePerfilComponent),
  },
  {
    path: 'mis-postulaciones',
    title: 'Mis postulaciones | Conecta Oportunidades',
    loadComponent: () =>
      import('./pages/postulaciones/container/component').then(
        (m) => m.PostulantePostulacionesComponent,
      ),
  },
];
