export type EstadoOportunidad = 'Pendiente' | 'Publicada' | 'Rechazada' | 'Cerrada';

export interface Oportunidad {
  id: string;
  slug: string;
  titulo: string;
  organizacion: string;
  organizacionId: string;
  logo: string;
  ubicacion: string;
  modalidad: string;
  tipo: string;
  categoria: string;
  fechaLimite: string;
  descripcion: string;
  fechaPublicacion: string;
  estado: EstadoOportunidad;
  beneficios: string[];
  destacada: boolean;
  cantidadVacantes: number;
  salario?: string;
  fechaCreacion: string;
  fechaActualizacion: string;
  requisitos: string[];
  responsabilidades: string[];
}
