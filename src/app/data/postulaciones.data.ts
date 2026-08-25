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
    id: 'post-juan-frontend-angular',
    slug: 'juan-perez-pasantia-frontend-angular',

    oportunidadId: 'opo-pasantia-frontend-angular',
    oportunidadSlug: 'pasantia-frontend-angular',

    usuarioId: 'FoFr4MkvdUP4ZS1GOmo4ZLXSI2g2',
    usuarioSlug: 'juan-perez',

    organizacionId: 'org-xyz',

    fechaPostulacion: '2026-08-15',
    estado: 'En revisión',

    nombrePostulante: 'Juan Pérez',
    correoPostulante: 'juan.perez@example.com',
    telefono: '+591 70000001',
    carrera: 'Ingeniería Informática',

    cvUrl: 'cvs/FoFr4MkvdUP4ZS1GOmo4ZLXSI2g2/cv-juan-perez.pdf',

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
    id: 'post-juan-diseno-ui-ux',
    slug: 'juan-perez-pasantia-diseno-ui-ux',

    oportunidadId: 'opo-pasantia-ui-ux',
    oportunidadSlug: 'pasantia-diseno-ui-ux',

    usuarioId: 'FoFr4MkvdUP4ZS1GOmo4ZLXSI2g2',
    usuarioSlug: 'juan-perez',

    organizacionId: 'org-softstudio',

    fechaPostulacion: '2026-08-18',
    estado: 'Entrevista',

    nombrePostulante: 'Juan Pérez',
    correoPostulante: 'juan.perez@example.com',
    telefono: '+591 70000001',
    carrera: 'Ingeniería Informática',

    cvUrl: 'cvs/FoFr4MkvdUP4ZS1GOmo4ZLXSI2g2/cv-juan-perez.pdf',

    cartaPresentacion:
      'Me interesa ampliar mis conocimientos en diseño de interfaces y experiencia de usuario.',

    historial: [
      {
        estado: 'Enviada',
        fecha: '2026-08-18',
      },
      {
        estado: 'En revisión',
        fecha: '2026-08-19',
      },
      {
        estado: 'Entrevista',
        fecha: '2026-08-22',
        observacion: 'Perfil convocado a entrevista.',
      },
    ],

    fechaActualizacion: '2026-08-22',
  },

  {
    id: 'post-juan-soporte-ti',
    slug: 'juan-perez-pasantia-soporte-ti',

    oportunidadId: 'opo-pasantia-soporte-ti',
    oportunidadSlug: 'pasantia-soporte-ti',

    usuarioId: 'FoFr4MkvdUP4ZS1GOmo4ZLXSI2g2',
    usuarioSlug: 'juan-perez',

    organizacionId: 'org-andes',

    fechaPostulacion: '2026-08-21',
    estado: 'Seleccionada',

    nombrePostulante: 'Juan Pérez',
    correoPostulante: 'juan.perez@example.com',
    telefono: '+591 70000001',
    carrera: 'Ingeniería Informática',

    cvUrl: 'cvs/FoFr4MkvdUP4ZS1GOmo4ZLXSI2g2/cv-juan-perez.pdf',

    cartaPresentacion:
      'Deseo adquirir experiencia práctica en soporte técnico y tecnologías de información.',

    historial: [
      {
        estado: 'Enviada',
        fecha: '2026-08-21',
      },
      {
        estado: 'En revisión',
        fecha: '2026-08-22',
      },
      {
        estado: 'Entrevista',
        fecha: '2026-08-23',
      },
      {
        estado: 'Seleccionada',
        fecha: '2026-08-24',
        observacion: 'Postulante seleccionado para la oportunidad.',
      },
    ],

    fechaActualizacion: '2026-08-24',
  },

  {
    id: 'post-juan-beca-fullstack-cloud',
    slug: 'juan-perez-beca-formacion-fullstack-cloud',

    oportunidadId: 'opo-beca-fullstack-cloud',
    oportunidadSlug: 'beca-formacion-fullstack-cloud',

    usuarioId: 'FoFr4MkvdUP4ZS1GOmo4ZLXSI2g2',
    usuarioSlug: 'juan-perez',

    organizacionId: 'org-estrella',

    fechaPostulacion: '2026-08-20',
    estado: 'Enviada',

    nombrePostulante: 'Juan Pérez',
    correoPostulante: 'juan.perez@example.com',
    telefono: '+591 70000001',
    carrera: 'Ingeniería Informática',

    cvUrl: 'cvs/FoFr4MkvdUP4ZS1GOmo4ZLXSI2g2/cv-juan-perez.pdf',

    cartaPresentacion:
      'Me interesa fortalecer mis conocimientos en desarrollo fullstack y tecnologías cloud.',

    historial: [
      {
        estado: 'Enviada',
        fecha: '2026-08-20',
      },
    ],

    fechaActualizacion: '2026-08-20',
  },

  {
    id: 'post-juan-asistente-diseno',
    slug: 'juan-perez-asistente-diseno-grafico',

    oportunidadId: 'opo-asistente-diseno',
    oportunidadSlug: 'asistente-diseno-grafico',

    usuarioId: 'FoFr4MkvdUP4ZS1GOmo4ZLXSI2g2',
    usuarioSlug: 'juan-perez',

    organizacionId: 'org-creativa',

    fechaPostulacion: '2026-08-20',
    estado: 'Rechazada',

    nombrePostulante: 'Juan Pérez',
    correoPostulante: 'juan.perez@example.com',
    telefono: '+591 70000001',
    carrera: 'Ingeniería Informática',

    cvUrl: 'cvs/FoFr4MkvdUP4ZS1GOmo4ZLXSI2g2/cv-juan-perez.pdf',

    cartaPresentacion:
      'Me interesa participar en proyectos digitales y fortalecer mis habilidades en diseño gráfico.',

    historial: [
      {
        estado: 'Enviada',
        fecha: '2026-08-20',
      },
      {
        estado: 'En revisión',
        fecha: '2026-08-21',
      },
      {
        estado: 'Rechazada',
        fecha: '2026-08-23',
        observacion: 'La organización seleccionó otro perfil.',
      },
    ],

    fechaActualizacion: '2026-08-23',
  },
];
