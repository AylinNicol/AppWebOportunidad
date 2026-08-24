import { Routes } from '@angular/router';

import { PublicRoutes } from './ui/public/routes';
import { AdminRoutes } from './ui/admin/routes';
import { PostulanteRoutes } from './ui/public/postulante/routes';
import { OrganizacionRoutes } from './ui/public/organizacion/routes';

export const routes: Routes = [
  // Admin
  {
    path: 'admin',
    loadComponent: () => import('./ui/admin/container/component').then((m) => m.AdminComponent),
    children: AdminRoutes,
  },
  // Public
  {
    path: '',
    loadComponent: () => import('./ui/public/container/component').then((m) => m.PublicComponent),
    children: [
      {
        path: 'postulante',
        children: PostulanteRoutes,
      },
      {
        path: 'organizacion',
        children: OrganizacionRoutes,
      },
      ...PublicRoutes,
    ],
  },
];
