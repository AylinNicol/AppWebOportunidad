import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

interface Organization {
  id: string;
  slug: string;
  nombre: string;
  categoria: string;
  Ubicacion: string;
  description: string;
  opportunitiesCount: number;
  verified: boolean;
  email: string;
}

@Component({
  selector: 'organizaciones',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  imports: [
    FormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
  ],
})
export class OrganizacionesPublicComponent {
  search = '';

  readonly organizations: Organization[] = [
    {
      id: 'org-xyz',
      slug: 'empresa-xyz',
      nombre: 'Empresa XYZ',
      categoria: 'Tecnología & Software',
      Ubicacion: 'Oruro, Bolivia',
      description:
        'Empresa dedicada al desarrollo de soluciones tecnológicas e innovación en software web y móvil.',
      opportunitiesCount: 1,
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
      opportunitiesCount: 1,
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
      opportunitiesCount: 15,
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
      opportunitiesCount: 4,
      verified: false,
      email: 'hola@techbolivia.org',
    },
  ];

  get filtradoOrganizaciones(): Organization[] {
    const value = this.search.toLowerCase().trim();

    if (!value) {
      return this.organizations;
    }

    return this.organizations.filter(
      (org) =>
        org.nombre.toLowerCase().includes(value) ||
        org.categoria.toLowerCase().includes(value) ||
        org.Ubicacion.toLowerCase().includes(value),
    );
  }
}
