import { Component, computed, signal } from '@angular/core';
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

import { OPORTUNIDADES, Oportunidad } from '../../../../../data/oportunidades.data';

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
  readonly busqueda = signal('');
  readonly estado = signal<Oportunidad['estado'] | ''>('');
  readonly oportunidades = signal<Oportunidad[]>([...OPORTUNIDADES]);
  paginaActual = 0;
  tamanoPagina = 5;

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
    const inicio = this.paginaActual * this.tamanoPagina;
    return this.filtradas().slice(inicio, inicio + this.tamanoPagina);
  });

  constructor(private snackBar: MatSnackBar) {}
  cambiarEstado(id: string, estado: Oportunidad['estado']): void {
    this.oportunidades.update((items) =>
      items.map((item) => (item.id === id ? { ...item, estado } : item)),
    );
    this.snackBar.open(`Estado actualizado a ${estado}.`, 'Cerrar', {
      duration: 2500,
    });
  }

  limpiarFiltros(): void {
    this.busqueda.set('');
    this.estado.set('');
    this.paginaActual = 0;
  }
  cambiarPagina(evento: PageEvent): void {
    this.paginaActual = evento.pageIndex;
    this.tamanoPagina = evento.pageSize;
  }
}
