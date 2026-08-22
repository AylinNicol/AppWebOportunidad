export interface Organizacion {
  id: string;
  slug: string;
  nombre: string;
  categoria: string;
  Ubicacion: string;
  description: string;
  oportunidadesCount: number;
  verified: boolean;
  email: string;
}

export const Organizaciones: Organizacion[] = [
  {
    id: 'org-xyz',
    slug: 'empresa-xyz',
    nombre: 'Empresa XYZ',
    categoria: 'Tecnología & Software',
    Ubicacion: 'Oruro, Bolivia',
    description:
      'Empresa dedicada al desarrollo de soluciones tecnológicas e innovación en software web y móvil.',
    oportunidadesCount: 1,
    verified: true,
    email: 'contacto@xyz.bo',
  },
  {
    id: 'org-abc',
    slug: 'empresa-abc',
    nombre: 'Empresa ABC',
    categoria: 'Consultoría e Ingeniería',
    Ubicacion: 'Oruro, Bolivia',
    description: 'Firma de tecnología y consultoría digital especializada en empresas locales.',
    oportunidadesCount: 1,
    verified: true,
    email: 'info@abc.com.bo',
  },
  {
    id: 'org-estrella',
    slug: 'fundacion-estrella-del-sur',
    nombre: 'Fundación Estrella del Sur',
    categoria: 'ONG & Desarrollo Social',
    Ubicacion: 'Oruro / La Paz',
    description:
      'Organización sin fines de lucro enfocada en el empoderamiento juvenil y becas educativas.',
    oportunidadesCount: 15,
    verified: true,
    email: 'contacto@estrelladelsur.org',
  },
  {
    id: 'org-techbolivia',
    slug: 'techbolivia-community',
    nombre: 'TechBolivia Community',
    categoria: 'Comunidad Educativa',
    Ubicacion: 'Cochabamba',
    description: 'Red de profesionales en tecnología impulsando la educación en Bolivia.',
    oportunidadesCount: 4,
    verified: false,
    email: 'hola@techbolivia.org',
  },
];
