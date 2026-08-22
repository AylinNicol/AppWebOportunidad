import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { OPORTUNIDADES, Oportunidad } from './oportunidades.data';

@Component({
  selector: 'oportunidades',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  imports: [
    FormsModule,
    RouterLink,

    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
  ],
})
export class OportunidadesPublicComponent {
  readonly search = signal('');
  readonly categoria = signal('');
  readonly modalidad = signal('');
  readonly ubicacion = signal('');
  paginaActual = 0;
  tamanoPagina = 6;

  readonly oportunidades: Oportunidad[] = OPORTUNIDADES;

  readonly oportunidadesFiltradas = computed(() => {
    const search = this.search().trim().toLowerCase();
    return this.oportunidades.filter((item) => {
      const matchSearch =
        !search ||
        item.titulo.toLowerCase().includes(search) ||
        item.organizacion.toLowerCase().includes(search);
      const matchCategoria = !this.categoria() || item.categoria === this.categoria();
      const matchModalidad = !this.modalidad() || item.modalidad === this.modalidad();
      const matchUbicacion = !this.ubicacion() || item.ubicacion === this.ubicacion();
      return matchSearch && matchCategoria && matchModalidad && matchUbicacion;
    });
  });

  limpiarFiltros(): void {
    this.search.set('');
    this.categoria.set('');
    this.modalidad.set('');
    this.ubicacion.set('');
    this.paginaActual = 0;
  }

  get oportunidadesPaginadas() {
    const inicio = this.paginaActual * this.tamanoPagina;
    const fin = inicio + this.tamanoPagina;
    return this.oportunidadesFiltradas().slice(inicio, fin);
  }
  cambiarPagina(evento: PageEvent): void {
    this.paginaActual = evento.pageIndex;
    this.tamanoPagina = evento.pageSize;
  }
}
