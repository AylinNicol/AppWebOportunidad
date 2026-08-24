import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { OPORTUNIDADES, Oportunidad } from '../../../../../data/oportunidades.data';

@Component({
  selector: 'admin-publicaciones',
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
    MatSelectModule,
    MatSnackBarModule,
  ],
})
export class AdminPublicacionesComponent {
  readonly busqueda = signal('');

  readonly estado = signal<'Publicada' | 'Cerrada' | ''>('');

  readonly publicaciones = signal<Oportunidad[]>(
    OPORTUNIDADES.filter((item) => item.estado === 'Publicada' || item.estado === 'Cerrada'),
  );

  readonly filtradas = computed(() => {
    const texto = this.busqueda().trim().toLowerCase();
    const estado = this.estado();
    return this.publicaciones().filter((item) => {
      const coincideTexto =
        !texto ||
        item.titulo.toLowerCase().includes(texto) ||
        item.organizacion.toLowerCase().includes(texto);
      const coincideEstado = !estado || item.estado === estado;
      return coincideTexto && coincideEstado;
    });
  });

  constructor(private snackBar: MatSnackBar) {}

  alternarEstado(id: string): void {
    let nuevoEstado: 'Publicada' | 'Cerrada' = 'Publicada';
    this.publicaciones.update((items) =>
      items.map((item) => {
        if (item.id !== id) return item;
        nuevoEstado = item.estado === 'Publicada' ? 'Cerrada' : 'Publicada';
        return {
          ...item,
          estado: nuevoEstado,
        };
      }),
    );
    this.snackBar.open(`Publicación ${nuevoEstado.toLowerCase()}.`, 'Cerrar', {
      duration: 2500,
    });
  }

  limpiarFiltros(): void {
    this.busqueda.set('');
    this.estado.set('');
  }
}
