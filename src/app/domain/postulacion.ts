export type EstadoPostulacion =
  | 'Enviada'
  | 'En revisión'
  | 'Entrevista'
  | 'Seleccionada'
  | 'Rechazada';

export interface HistorialPostulacion {
  estado: EstadoPostulacion;
  fecha: string;
  observacion?: string;
}

export interface Postulacion {
  id: string;
  slug: string;
  oportunidadId: string;
  oportunidadSlug: string;
  usuarioId: string;
  usuarioSlug: string;
  organizacionId: string;
  fechaPostulacion: string;
  estado: EstadoPostulacion;
  nombrePostulante: string;
  correoPostulante: string;
  telefono: string;
  carrera: string;
  cvUrl: string;
  cartaPresentacion?: string;
  historial: HistorialPostulacion[];
  fechaActualizacion: string;
}
