import { Routes } from '@angular/router';

export const OrganizacionRoutes: Routes = [
  {
    path: 'panel-organizacion',
    title: 'Panel de organización | Conecta Oportunidades',
    loadComponent: () =>
      import('./pages/dashboard/container/component').then((m) => m.OrganizacionDashboardComponent),
  },
  {
    path: 'mi-organizacion',
    title: 'Mi organización | Conecta Oportunidades',
    loadComponent: () =>
      import('./pages/perfil/container/component').then((m) => m.OrganizacionPerfilComponent),
  },
  {
    path: 'mis-oportunidades',
    title: 'Mis oportunidades | Conecta Oportunidades',
    loadComponent: () =>
      import('./pages/oportunidades/container/component').then(
        (m) => m.OrganizacionOportunidadesComponent,
      ),
  },
  {
    path: 'publicar-oportunidad',
    title: 'Publicar oportunidad | Conecta Oportunidades',
    loadComponent: () =>
      import('./pages/publicar-oportunidad/container/component').then(
        (m) => m.PublicarOportunidadComponent,
      ),
  },
  {
    path: 'postulantes',
    title: 'Postulantes | Conecta Oportunidades',
    loadComponent: () =>
      import('./pages/postulantes/container/component').then(
        (m) => m.OrganizacionPostulantesComponent,
      ),
  },
];
