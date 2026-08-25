import { Routes } from '@angular/router';

import { PublicRoutes } from './ui/public/routes';
import { AdminRoutes } from './ui/admin/routes';
import { PostulanteRoutes } from './ui/public/postulante/routes';
import { OrganizacionRoutes } from './ui/public/organizacion/routes';

import { adminGuard, organizacionGuard, postulanteGuard } from './services/guards';

export const routes: Routes = [
  // Admin
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () => import('./ui/admin/container/component').then((m) => m.AdminComponent),
    children: AdminRoutes,
  },
  // Public
  {
    path: '',
    loadComponent: () => import('./ui/public/container/component').then((m) => m.PublicComponent),
    children: [
      // Postulante
      {
        path: 'postulante',
        canActivate: [postulanteGuard],
        children: PostulanteRoutes,
      },
      // Organización
      {
        path: 'organizacion',
        canActivate: [organizacionGuard],
        children: OrganizacionRoutes,
      },
      ...PublicRoutes,
    ],
  },
];
