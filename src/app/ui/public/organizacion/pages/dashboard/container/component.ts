import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

import { OPORTUNIDADES, Oportunidad } from '../../../../../../data/oportunidades.data';

import { ORGANIZACIONES, Organizacion } from '../../../../../../data/organizaciones.data';

@Component({
  selector: 'organizacion-dashboard',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  imports: [RouterLink, MatButtonModule, MatCardModule, MatChipsModule, MatIconModule],
})
export class OrganizacionDashboardComponent {
  readonly organizacion: Organizacion = ORGANIZACIONES[0];

  readonly oportunidades = signal<Oportunidad[]>(
    OPORTUNIDADES.filter(
      (item) =>
        item.organizacionId === this.organizacion.id ||
        item.organizacion === this.organizacion.nombre,
    ),
  );

  readonly total = computed(() => this.oportunidades().length);

  readonly publicadas = computed(
    () => this.oportunidades().filter((item) => item.estado === 'Publicada').length,
  );

  readonly pendientes = computed(
    () => this.oportunidades().filter((item) => item.estado === 'Pendiente').length,
  );

  readonly cerradas = computed(
    () => this.oportunidades().filter((item) => item.estado === 'Cerrada').length,
  );

  readonly recientes = computed(() => this.oportunidades().slice(0, 3));
}
