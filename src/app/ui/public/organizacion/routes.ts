import { Routes } from '@angular/router';

export const OrganizacionRoutes: Routes = [
  {
    path: 'panel-organizacion',
    loadComponent: () =>
      import('./pages/dashboard/container/component').then(
        (m) => m.OrganizacionDashboardComponent,
      ),
  },
  {
    path: 'mi-organizacion',
    loadComponent: () =>
      import('./pages/perfil/container/component').then(
        (m) => m.OrganizacionPerfilComponent,
      ),
  },
  {
    path: 'mis-oportunidades',
    loadComponent: () =>
      import('./pages/oportunidades/container/component').then(
        (m) => m.OrganizacionOportunidadesComponent,
      ),
  },
  {
    path: 'publicar-oportunidad',
    loadComponent: () =>
      import('./pages/publicar-oportunidad/container/component').then(
        (m) => m.PublicarOportunidadComponent,
      ),
  },
  {
    path: 'postulantes',
    loadComponent: () =>
      import('./pages/postulantes/container/component').then(
        (m) => m.OrganizacionPostulantesComponent,
      ),
  },
];
