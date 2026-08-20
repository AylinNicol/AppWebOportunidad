import { Routes } from '@angular/router';
import { PublicRoutes } from './ui/public/routes';

export const routes: Routes = [
    //public routes
    {
        path: '',
        loadComponent: () => import('./ui/public/container/component').then(m => m.PublicComponent),
        children: PublicRoutes
    },
    //admin routes
    {
        path: 'admin',
        loadComponent: () => import('./ui/admin/container/component').then(m => m.AdminComponent)
    }

];
