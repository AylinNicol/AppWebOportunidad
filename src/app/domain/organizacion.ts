export type EstadoOrganizacion = 'Activa' | 'Bloqueada';

export interface Organizacion {
  id: string;
  slug: string;
  usuarioId: string;
  nombre: string;
  categoria: string;
  ubicacion: string;
  descripcion: string;
  cantidadOportunidades: number;
  verificada: boolean;
  correo: string;
  telefono?: string;
  sitioWeb?: string;
  logo?: string;
  fechaRegistro: string;
  estado: EstadoOrganizacion;
}
