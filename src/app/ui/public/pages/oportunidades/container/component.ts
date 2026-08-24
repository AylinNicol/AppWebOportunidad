import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { OPORTUNIDADES, Oportunidad } from '../../../../../data/oportunidades.data';

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
  readonly busqueda = signal('');
  readonly categoria = signal('');
  readonly modalidad = signal('');
  readonly ubicacion = signal('');
  paginaActual = 0;
  tamanoPagina = 6;

  readonly oportunidades: Oportunidad[] = OPORTUNIDADES;

  readonly oportunidadesFiltradas = computed(() => {
    const busqueda = this.busqueda().trim().toLowerCase();
    return this.oportunidades.filter((item) => {
      const matchbuscar =
        !busqueda ||
        item.titulo.toLowerCase().includes(busqueda) ||
        item.organizacion.toLowerCase().includes(busqueda);
      const matchCategoria = !this.categoria() || item.categoria === this.categoria();
      const matchModalidad = !this.modalidad() || item.modalidad === this.modalidad();
      const matchUbicacion = !this.ubicacion() || item.ubicacion === this.ubicacion();
      return matchbuscar && matchCategoria && matchModalidad && matchUbicacion;
    });
  });

  constructor(private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe((params) => {
      this.busqueda.set(params.get('busqueda') ?? '');
      this.categoria.set(params.get('categoria') ?? '');
      this.modalidad.set(params.get('modalidad') ?? '');
      this.ubicacion.set(params.get('ubicacion') ?? '');

      this.paginaActual = 0;
    });
  }

  limpiarFiltros(): void {
    this.busqueda.set('');
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
