export interface Organizacion {
  id: string;
  slug: string;
  nombre: string;
  categoria: string;
  ubicacion: string;
  descripcion: string;
  cantidadOportunidades: number;
  verificada: boolean;
  correo: string;
}

export const ORGANIZACIONES: Organizacion[] = [
  {
    id: 'org-xyz',
    slug: 'empresa-xyz',
    nombre: 'Empresa XYZ',
    categoria: 'Tecnología & Software',
    ubicacion: 'Oruro, Bolivia',
    descripcion:
      'Empresa dedicada al desarrollo de soluciones tecnológicas e innovación en software web y móvil.',
    cantidadOportunidades: 1,
    verificada: true,
    correo: 'contacto@xyz.bo',
  },
  {
    id: 'org-abc',
    slug: 'empresa-abc',
    nombre: 'Empresa ABC',
    categoria: 'Consultoría e Ingeniería',
    ubicacion: 'Oruro, Bolivia',
    descripcion: 'Firma de tecnología y consultoría digital especializada en empresas locales.',
    cantidadOportunidades: 1,
    verificada: true,
    correo: 'info@abc.com.bo',
  },
  {
    id: 'org-estrella',
    slug: 'fundacion-estrella-del-sur',
    nombre: 'Fundación Estrella del Sur',
    categoria: 'ONG & Desarrollo Social',
    ubicacion: 'Oruro / La Paz',
    descripcion:
      'Organización sin fines de lucro enfocada en el empoderamiento juvenil y becas educativas.',
    cantidadOportunidades: 15,
    verificada: true,
    correo: 'contacto@estrelladelsur.org',
  },
  {
    id: 'org-techbolivia',
    slug: 'techbolivia-community',
    nombre: 'TechBolivia Community',
    categoria: 'Comunidad Educativa',
    ubicacion: 'Cochabamba, Bolivia',
    descripcion:
      'Red de profesionales en tecnología impulsando la educación y el desarrollo profesional en Bolivia.',
    cantidadOportunidades: 4,
    verificada: false,
    correo: 'hola@techbolivia.org',
  },

  // Nuevas organizaciones

  {
    id: 'org-nova',
    slug: 'nova-digital',
    nombre: 'Nova Digital',
    categoria: 'Tecnología & Software',
    ubicacion: 'La Paz, Bolivia',
    descripcion:
      'Empresa especializada en desarrollo de aplicaciones web, soluciones digitales y transformación tecnológica.',
    cantidadOportunidades: 3,
    verificada: true,
    correo: 'contacto@novadigital.bo',
  },
  {
    id: 'org-ingenia',
    slug: 'ingenia-consultores',
    nombre: 'Ingenia Consultores',
    categoria: 'Consultoría e Ingeniería',
    ubicacion: 'Cochabamba, Bolivia',
    descripcion:
      'Consultora orientada al desarrollo de proyectos de ingeniería, tecnología y gestión empresarial.',
    cantidadOportunidades: 2,
    verificada: true,
    correo: 'info@ingeniaconsultores.bo',
  },
  {
    id: 'org-futuro',
    slug: 'fundacion-futuro-joven',
    nombre: 'Fundación Futuro Joven',
    categoria: 'ONG & Desarrollo Social',
    ubicacion: 'Santa Cruz, Bolivia',
    descripcion:
      'Fundación dedicada a promover oportunidades educativas, voluntariados y programas de formación para jóvenes.',
    cantidadOportunidades: 6,
    verificada: true,
    correo: 'contacto@futurojoven.org',
  },
  {
    id: 'org-codehub',
    slug: 'codehub-bolivia',
    nombre: 'CodeHub Bolivia',
    categoria: 'Comunidad Educativa',
    ubicacion: 'La Paz, Bolivia',
    descripcion:
      'Comunidad tecnológica que organiza talleres, programas de formación y actividades para estudiantes de tecnología.',
    cantidadOportunidades: 5,
    verificada: false,
    correo: 'hola@codehub.bo',
  },
  {
    id: 'org-andes',
    slug: 'andes-tech-solutions',
    nombre: 'Andes Tech Solutions',
    categoria: 'Tecnología & Software',
    ubicacion: 'Oruro, Bolivia',
    descripcion:
      'Empresa de soluciones tecnológicas enfocada en software empresarial, automatización y servicios digitales.',
    cantidadOportunidades: 2,
    verificada: true,
    correo: 'empleos@andestech.bo',
  },
];
