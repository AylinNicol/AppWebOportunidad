import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { OPORTUNIDADES, Oportunidad } from '../../../../../../data/oportunidades.data';

import { ORGANIZACIONES } from '../../../../../../data/organizaciones.data';

@Component({
  selector: 'organizacion-oportunidades',
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
    MatSelectModule,
  ],
})
export class OrganizacionOportunidadesComponent {
  readonly organizacion = ORGANIZACIONES[0];
  readonly busqueda = signal('');
  readonly estado = signal('');

  readonly oportunidades = signal<Oportunidad[]>(
    OPORTUNIDADES.filter(
      (item) =>
        item.organizacionId === this.organizacion.id ||
        item.organizacion === this.organizacion.nombre,
    ),
  );

  readonly filtradas = computed(() => {
    const busqueda = this.busqueda().trim().toLowerCase();

    return this.oportunidades().filter((item) => {
      const coincideBusqueda = !busqueda || item.titulo.toLowerCase().includes(busqueda);

      const coincideEstado = !this.estado() || item.estado === this.estado();

      return coincideBusqueda && coincideEstado;
    });
  });

  cerrar(item: Oportunidad): void {
    item.estado = 'Cerrada';
    this.oportunidades.set([...this.oportunidades()]);
  }

  limpiar(): void {
    this.busqueda.set('');
    this.estado.set('');
  }
}
