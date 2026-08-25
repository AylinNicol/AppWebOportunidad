export type RolUsuario = 'Postulante' | 'Organización' | 'Administrador';
export type EstadoUsuario = 'Activo' | 'Bloqueado';

export interface Usuario {
  id: string;
  slug: string;
  uidFirebase?: string;
  nombre: string;
  correo: string;
  rol: RolUsuario;
  estado: EstadoUsuario;
  fotoPerfil?: string;
  telefono?: string;
  ubicacion?: string;
  carrera?: string;
  universidad?: string;
  fechaEgreso?: string;
  cvUrl?: string;
  organizacionId?: string;
  fechaRegistro: string;
  ultimoAcceso?: string;
}
