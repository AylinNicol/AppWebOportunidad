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

import { POSTULACIONES, Postulacion } from '../../../../../../data/postulaciones.data';
import { OPORTUNIDADES } from '../../../../../../data/oportunidades.data';

@Component({
  selector: 'postulante-postulaciones',
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
export class PostulantePostulacionesComponent {
  readonly busqueda = signal('');
  readonly estado = signal<Postulacion['estado'] | ''>('');
  readonly postulaciones = signal<Postulacion[]>(
    POSTULACIONES.filter((postulacion) => postulacion.usuarioId === 'usr-001'),
  );

  readonly filtradas = computed(() => {
    const busqueda = this.busqueda().trim().toLowerCase();
    const estado = this.estado();
    return this.postulaciones()
      .map((item) => {
        const oportunidad = OPORTUNIDADES.find(
          (oportunidad) => oportunidad.id === item.oportunidadId,
        );
        return {
          ...item,
          oportunidad,
        };
      })
      .filter((item) => {
        const coincideBusqueda =
          !busqueda ||
          item.oportunidad?.titulo.toLowerCase().includes(busqueda) ||
          item.oportunidad?.organizacion.toLowerCase().includes(busqueda);
        const coincideEstado = !estado || item.estado === estado;
        return coincideBusqueda && coincideEstado;
      });
  });

  obtenerOportunidad(postulacion: Postulacion) {
    return OPORTUNIDADES.find((oportunidad) => oportunidad.id === postulacion.oportunidadId);
  }
  limpiar(): void {
    this.busqueda.set('');
    this.estado.set('');
  }
}
