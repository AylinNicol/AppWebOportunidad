import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // DETALLES PÚBLICOS DINÁMICOS
  {
    path: 'oportunidades/:slug',
    renderMode: RenderMode.Server,
  },
  {
    path: 'organizaciones/:slug',
    renderMode: RenderMode.Server,
  },
  // ZONAS PRIVADAS - SPA
  {
    path: 'postulante/**',
    renderMode: RenderMode.Client,
  },
  {
    path: 'organizacion/**',
    renderMode: RenderMode.Client,
  },
  {
    path: 'admin/**',
    renderMode: RenderMode.Client,
  },

  // RESTO DE PÁGINAS PÚBLICAS
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
