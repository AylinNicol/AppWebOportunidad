import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { Organizacion } from '../../../../../domain/organizacion';
import { OrganizacionesService } from '../../../../../services/organizaciones';

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
    MatPaginatorModule,
  ],
})
export class OrganizacionesPublicComponent {
  private readonly organizacionesService = inject(OrganizacionesService);

  buscar = '';
  paginaActual = 0;
  tamanoPagina = 6;

  readonly organizaciones = signal<Organizacion[]>([]);

  constructor() {
    this.cargarOrganizaciones();
  }
  private async cargarOrganizaciones(): Promise<void> {
    try {
      const organizaciones = await this.organizacionesService.todas();
      this.organizaciones.set(organizaciones);
    } catch (error) {
      console.error('Error al cargar organizaciones:', error);
    }
  }

  get filtradoOrganizaciones(): Organizacion[] {
    const value = this.buscar.toLowerCase().trim();
    if (!value) {
      return this.organizaciones();
    }
    return this.organizaciones().filter(
      (org) =>
        org.nombre.toLowerCase().includes(value) ||
        org.categoria.toLowerCase().includes(value) ||
        org.ubicacion.toLowerCase().includes(value),
    );
  }

  get organizacionesPaginadas(): Organizacion[] {
    const inicio = this.paginaActual * this.tamanoPagina;
    const fin = inicio + this.tamanoPagina;
    return this.filtradoOrganizaciones.slice(inicio, fin);
  }

  cambiarPagina(evento: PageEvent): void {
    this.paginaActual = evento.pageIndex;
    this.tamanoPagina = evento.pageSize;
  }

  limpiarBusqueda(): void {
    this.buscar = '';
    this.paginaActual = 0;
  }
}
