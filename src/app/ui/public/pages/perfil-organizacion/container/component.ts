import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Organizacion } from '../../../../../domain/organizacion';
import { Oportunidad } from '../../../../../domain/oportunidad';

import { OrganizacionesService } from '../../../../../services/organizaciones';
import { OportunidadesService } from '../../../../../services/oportunidades';

@Component({
  selector: 'organizacion',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatTooltipModule,
  ],
})
export class PerfilOrganizacionPublicComponent {
  private readonly organizacionesService = inject(OrganizacionesService);
  private readonly oportunidadesService = inject(OportunidadesService);
  private readonly route = inject(ActivatedRoute);
  readonly organizacion = signal<Organizacion | null>(null);
  readonly oportunidades = signal<Oportunidad[]>([]);

  constructor() {
    this.cargarOrganizacion();
  }
  private async cargarOrganizacion(): Promise<void> {
    const slug = this.route.snapshot.paramMap.get('slug');

    if (!slug) {
      return;
    }
    try {
      const organizacion = await this.organizacionesService.porSlug(slug);
      if (!organizacion) {
        return;
      }
      this.organizacion.set(organizacion);
      const todas = await this.oportunidadesService.todas();

      const oportunidadesOrganizacion = todas.filter(
        (oportunidad) =>
          oportunidad.organizacionId === organizacion.id && oportunidad.estado === 'Publicada',
      );

      this.oportunidades.set(oportunidadesOrganizacion);
    } catch (error) {
      console.error('Error al cargar la organización:', error);
    }
  }
}
