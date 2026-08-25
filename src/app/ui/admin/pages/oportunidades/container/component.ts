import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';

import { Oportunidad } from '../../../../../domain/oportunidad';
import { OportunidadesService } from '../../../../../services/oportunidades';

@Component({
  selector: 'admin-oportunidades',
  templateUrl: './component.html',
  styleUrl: './component.css',
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
  ],
})
export class AdminOportunidadesComponent {
  private readonly oportunidadesService = inject(OportunidadesService);
  private readonly snackBar = inject(MatSnackBar);

  readonly busqueda = signal('');
  readonly estado = signal<Oportunidad['estado'] | ''>('');

  readonly oportunidades = signal<Oportunidad[]>([]);
  readonly cargando = signal(true);
  readonly error = signal<string | null>(null);

  readonly paginaActual = signal(0);
  readonly tamanoPagina = signal(5);

  readonly columnas = ['oportunidad', 'tipo', 'modalidad', 'fecha', 'estado', 'acciones'];

  readonly filtradas = computed(() => {
    const texto = this.busqueda().trim().toLowerCase();
    const estado = this.estado();

    return this.oportunidades().filter((item) => {
      const coincideTexto =
        !texto ||
        item.titulo.toLowerCase().includes(texto) ||
        item.organizacion.toLowerCase().includes(texto);

      const coincideEstado = !estado || item.estado === estado;

      return coincideTexto && coincideEstado;
    });
  });

  readonly paginadas = computed(() => {
    const inicio = this.paginaActual() * this.tamanoPagina();
    return this.filtradas().slice(inicio, inicio + this.tamanoPagina());
  });

  constructor() {
    this.cargarOportunidades();
  }

  async cargarOportunidades(): Promise<void> {
    try {
      this.cargando.set(true);
      this.error.set(null);
      const oportunidades = await this.oportunidadesService.todas();
      this.oportunidades.set(oportunidades);
    } catch (error) {
      console.error('Error al cargar oportunidades administrativas:', error);
      this.error.set('No se pudieron cargar las oportunidades.');
    } finally {
      this.cargando.set(false);
    }
  }

  async cambiarEstado(item: Oportunidad, nuevoEstado: Oportunidad['estado']): Promise<void> {
    try {
      await this.oportunidadesService.cambiarEstado(item.id, nuevoEstado);
      this.oportunidades.update((items) =>
        items.map((oportunidad) =>
          oportunidad.id === item.id
            ? {
                ...oportunidad,
                estado: nuevoEstado,
                fechaActualizacion: new Date().toISOString(),
              }
            : oportunidad,
        ),
      );

      this.snackBar.open(`Estado actualizado a ${nuevoEstado}.`, 'Cerrar', {
        duration: 2500,
      });
    } catch (error) {
      console.error('Error al actualizar oportunidad:', error);

      this.snackBar.open('No se pudo actualizar la oportunidad.', 'Cerrar', {
        duration: 3000,
      });
    }
  }
  cambiarFiltroEstado(valor: Oportunidad['estado'] | ''): void {
    this.estado.set(valor);
    this.paginaActual.set(0);
  }
  limpiarFiltros(): void {
    this.busqueda.set('');
    this.estado.set('');
    this.paginaActual.set(0);
  }

  cambiarPagina(evento: PageEvent): void {
    this.paginaActual.set(evento.pageIndex);
    this.tamanoPagina.set(evento.pageSize);
  }
}
