import { Routes } from '@angular/router';

export const PublicRoutes: Routes = [
    {
        path: '',
        title: 'Oportunidades | Impulsa tu Carrera Profesional',
        loadComponent: () => import('./pages/inicio/container/component').then(m => m.InicioPublicComponent)
    },
    {
        path: 'oportunidades',
        title: 'Oportunidades disponibles',
        loadComponent: () => import('./pages/opoturnidades/container/component').then(m => m.OportunidadesPublicComponent)
    },
    {
        path: 'organizaciones',
        title: 'Organizaciones registradas',
        loadComponent: () => import('./pages/organizaciones/container/component').then(m => m.OrganizacionesPublicComponent)
    },
    {
        path: 'como-funciona',
        title: '¿Cómo funciona?',
        loadComponent: () => import('./pages/como-funciona/container/component').then(m => m.ComoFuncionaPublicComponent)
    },
    {
        path: 'acerca-de',
        title: 'Acerca de',
        loadComponent: () => import('./pages/acerca-de/container/component').then(m => m.AcercaDePublicComponent)
    }   
];

/*
import { Routes } from '@angular/router';
import { PublicContainerComponent } from './container/component';

export const PUBLIC_ROUTES: Routes = [
  {
    path: '',
    component: PublicContainerComponent,
    children: [
      {
        path: '',
        title: 'Oportunidades | Impulsa tu Carrera Profesional',
        loadComponent: () =>
          import('./pages/inicio/container/component').then(
            m => m.InicioContainerComponent
          )
      },
      {
        path: 'oportunidades',
        title: 'Oportunidades disponibles',
        loadComponent: () =>
          import('./pages/oportunidades/container/component').then(
            m => m.OportunidadesContainerComponent
          )
      },
      {
        path: 'oportunidades/:id',
        title: 'Detalle de oportunidad',
        loadComponent: () =>
          import('./pages/oportunidades/container/component').then(
            m => m.OportunidadesContainerComponent
          )
      },
      {
        path: 'organizaciones',
        title: 'Organizaciones registradas',
        loadComponent: () =>
          import('./pages/organizaciones/container/component').then(
            m => m.OrganizacionesContainerComponent
          )
      },
      {
        path: 'organizaciones/:id',
        title: 'Perfil de organización',
        loadComponent: () =>
          import('./pages/organizaciones/container/component').then(
            m => m.OrganizacionesContainerComponent
          )
      },
      {
        path: 'como-funciona',
        title: '¿Cómo funciona? | Oportunidades',
        loadComponent: () =>
          import('./pages/como-funciona/container/component').then(
            m => m.ComoFuncionaContainerComponent
          )
      },
      {
        path: 'acerca-de',
        title: 'Acerca de | Oportunidades',
        loadComponent: () =>
          import('./pages/acerca-de/container/component').then(
            m => m.AcercaDeContainerComponent
          )
      }
    ]
  }
];
*/