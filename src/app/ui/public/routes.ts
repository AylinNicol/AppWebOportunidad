import { Routes } from '@angular/router';

export const PublicRoutes: Routes = [
  {
    path: '',
    title: 'Oportunidades | Impulsa tu Carrera Profesional',
    loadComponent: () =>
      import('./pages/inicio/container/component').then((m) => m.InicioPublicComponent),
  },
  {
    path: 'oportunidades',
    title: 'Oportunidades disponibles',
    loadComponent: () =>
      import('./pages/opoturnidades/container/component').then(
        (m) => m.OportunidadesPublicComponent,
      ),
  },
  {
    path: 'organizaciones',
    title: 'Organizaciones registradas',
    loadComponent: () =>
      import('./pages/organizaciones/container/component').then(
        (m) => m.OrganizacionesPublicComponent,
      ),
  },
  {
    path: 'organizaciones/:slug',
    title: 'Organización',
    loadComponent: () =>
      import('./pages/perfil-organizacion/container/component').then(
        (m) => m.PerfilOrganizacionPublicComponent,
      ),
  },
  {
    path: 'como-funciona',
    title: '¿Cómo funciona?',
    loadComponent: () =>
      import('./pages/como-funciona/container/component').then(
        (m) => m.ComoFuncionaPublicComponent,
      ),
  },
  {
    path: 'acerca-de',
    title: 'Acerca de',
    loadComponent: () =>
      import('./pages/acerca-de/container/component').then((m) => m.AcercaDePublicComponent),
  },
  {
    path: '**',
    title: 'Página no encontrada',
    loadComponent: () =>
      import('./pages/notFound/container/component').then((m) => m.NotFoundPublicComponent),
  },
];
