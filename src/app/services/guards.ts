import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RolUsuario } from '../domain/usuario';
import { AuthService } from './auth';

export const authGuard: CanActivateFn = async () => {
  const auth = inject(AuthService); const router = inject(Router);
  await auth.ready;
  return auth.autenticado() ? true : router.createUrlTree(['/']);
};

export function roleGuard(...roles: RolUsuario[]): CanActivateFn {
  return async () => {
    const auth = inject(AuthService); const router = inject(Router);
    await auth.ready;
    const user = auth.usuario();
    if (!user) return router.createUrlTree(['/']);
    if (user.estado === 'Bloqueado') return router.createUrlTree(['/']);
    return roles.includes(user.rol) ? true : router.createUrlTree([homeByRole(user.rol)]);
  };
}

export const postulanteGuard = roleGuard('Postulante');
export const organizacionGuard = roleGuard('Organización');
export const adminGuard = roleGuard('Administrador');

export function homeByRole(rol: RolUsuario): string {
  if (rol === 'Administrador') return '/admin';
  if (rol === 'Organización') return '/organizacion/panel-organizacion';
  return '/postulante/mi-panel';
}
