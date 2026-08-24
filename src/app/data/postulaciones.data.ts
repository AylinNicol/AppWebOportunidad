export type EstadoPostulacion =
  'Enviada' | 'En revisión' | 'Entrevista' | 'Seleccionada' | 'Rechazada';

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

export const POSTULACIONES: Postulacion[] = [
  {
    id: 'post-001',
    slug: 'maria-flores-pasantia-frontend-angular',
    oportunidadId: '1',
    oportunidadSlug: 'pasantia-frontend-angular',
    usuarioId: 'usr-001',
    usuarioSlug: 'maria-flores',
    organizacionId: 'org-xyz',
    fechaPostulacion: '2026-08-15',
    estado: 'En revisión',
    nombrePostulante: 'María Flores',
    correoPostulante: 'maria.flores@example.com',
    telefono: '+591 70000001',
    carrera: 'Ingeniería Informática',
    cvUrl: 'cvs/usr-001/cv-maria-flores.pdf',
    cartaPresentacion:
      'Me interesa fortalecer mi experiencia en Angular y aportar en proyectos frontend.',
    historial: [
      {
        estado: 'Enviada',
        fecha: '2026-08-15',
        observacion: 'Postulación registrada correctamente.',
      },
      {
        estado: 'En revisión',
        fecha: '2026-08-17',
        observacion: 'La organización inició la revisión del perfil.',
      },
    ],
    fechaActualizacion: '2026-08-17',
  },
  {
    id: 'post-002',
    slug: 'ana-rojas-pasantia-diseno-ui-ux',
    oportunidadId: '5',
    oportunidadSlug: 'pasantia-diseno-ui-ux',
    usuarioId: 'usr-003',
    usuarioSlug: 'ana-rojas',
    organizacionId: 'org-softstudio',
    fechaPostulacion: '2026-08-18',
    estado: 'Entrevista',
    nombrePostulante: 'Ana Rojas',
    correoPostulante: 'ana.rojas@example.com',
    telefono: '+591 70000003',
    carrera: 'Diseño Gráfico',
    cvUrl: 'cvs/usr-003/cv-ana-rojas.pdf',
    cartaPresentacion:
      'Quiero aplicar mis conocimientos de diseño de interfaces y seguir desarrollando mi portafolio.',
    historial: [
      { estado: 'Enviada', fecha: '2026-08-18' },
      { estado: 'En revisión', fecha: '2026-08-19' },
      { estado: 'Entrevista', fecha: '2026-08-22', observacion: 'Perfil convocado a entrevista.' },
    ],
    fechaActualizacion: '2026-08-22',
  },
  {
    id: 'post-003',
    slug: 'diego-mamani-pasantia-soporte-ti',
    oportunidadId: '7',
    oportunidadSlug: 'pasantia-soporte-ti',
    usuarioId: 'usr-004',
    usuarioSlug: 'diego-mamani',
    organizacionId: 'org-andes',
    fechaPostulacion: '2026-08-21',
    estado: 'Seleccionada',
    nombrePostulante: 'Diego Mamani',
    correoPostulante: 'diego.mamani@example.com',
    telefono: '+591 70000004',
    carrera: 'Ingeniería de Sistemas',
    cvUrl: 'cvs/usr-004/cv-diego-mamani.pdf',
    historial: [
      { estado: 'Enviada', fecha: '2026-08-21' },
      { estado: 'En revisión', fecha: '2026-08-22' },
      { estado: 'Entrevista', fecha: '2026-08-23' },
      {
        estado: 'Seleccionada',
        fecha: '2026-08-24',
        observacion: 'Postulante seleccionado para la oportunidad.',
      },
    ],
    fechaActualizacion: '2026-08-24',
  },
  {
    id: 'post-004',
    slug: 'maria-flores-beca-formacion-fullstack-cloud',
    oportunidadId: '3',
    oportunidadSlug: 'beca-formacion-fullstack-cloud',
    usuarioId: 'usr-001',
    usuarioSlug: 'maria-flores',
    organizacionId: 'org-estrella',
    fechaPostulacion: '2026-08-20',
    estado: 'Enviada',
    nombrePostulante: 'María Flores',
    correoPostulante: 'maria.flores@example.com',
    telefono: '+591 70000001',
    carrera: 'Ingeniería Informática',
    cvUrl: 'cvs/usr-001/cv-maria-flores.pdf',
    historial: [{ estado: 'Enviada', fecha: '2026-08-20' }],
    fechaActualizacion: '2026-08-20',
  },
  {
    id: 'post-005',
    slug: 'ana-rojas-asistente-diseno-grafico',
    oportunidadId: '15',
    oportunidadSlug: 'asistente-diseno-grafico',
    usuarioId: 'usr-003',
    usuarioSlug: 'ana-rojas',
    organizacionId: 'org-creativa',
    fechaPostulacion: '2026-08-20',
    estado: 'Rechazada',
    nombrePostulante: 'Ana Rojas',
    correoPostulante: 'ana.rojas@example.com',
    telefono: '+591 70000003',
    carrera: 'Diseño Gráfico',
    cvUrl: 'cvs/usr-003/cv-ana-rojas.pdf',
    historial: [
      { estado: 'Enviada', fecha: '2026-08-20' },
      { estado: 'En revisión', fecha: '2026-08-21' },
      {
        estado: 'Rechazada',
        fecha: '2026-08-23',
        observacion: 'La organización seleccionó otro perfil.',
      },
    ],
    fechaActualizacion: '2026-08-23',
  },
];
