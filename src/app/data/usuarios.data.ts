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
  fechaRegistro: string;
  ultimoAcceso?: string;
}

export const USUARIOS: Usuario[] = [
  {
    id: 'VqabbrdqS8hhekrNtB7JvzVvTvY2',
    slug: 'administrador-principal',
    uidFirebase: 'VqabbrdqS8hhekrNtB7JvzVvTvY2',
    nombre: 'Administrador Principal',
    correo: 'admin@oportunidades.bo',
    rol: 'Administrador',
    estado: 'Activo',
    fechaRegistro: '2026-08-01',
    ultimoAcceso: '2026-08-24',
  },
  {
    id: 'FoFr4MkvdUP4ZS1GOmo4ZLXSI2g2',
    slug: 'juan-perez',
    uidFirebase: 'FoFr4MkvdUP4ZS1GOmo4ZLXSI2g2',
    nombre: 'Juan Pérez',
    correo: 'juan.perez@example.com',
    rol: 'Postulante',
    estado: 'Activo',
    telefono: '+591 70000001',
    ubicacion: 'Oruro, Bolivia',
    carrera: 'Ingeniería Informática',
    universidad: 'Universidad Técnica de Oruro',
    fechaEgreso: '2026',
    fechaRegistro: '2026-08-20',
    ultimoAcceso: '2026-08-24',
  },
  {
    id: 'QPgJnM8ASdfJINSK6nLPA9TBmzs2',
    slug: 'maria-lopez',
    uidFirebase: 'QPgJnM8ASdfJINSK6nLPA9TBmzs2',
    nombre: 'María López',
    correo: 'maria.lopez@example.com',
    rol: 'Organización',
    estado: 'Activo',
    telefono: '+591 70000002',
    ubicacion: 'Oruro, Bolivia',
    fechaRegistro: '2026-08-20',
    ultimoAcceso: '2026-08-24',
  },
];
