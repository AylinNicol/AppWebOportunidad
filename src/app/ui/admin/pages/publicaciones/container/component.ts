import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { Oportunidad } from '../../../../../domain/oportunidad';
import { OportunidadesService } from '../../../../../services/oportunidades';

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
  private readonly oportunidadesService = inject(OportunidadesService);
  private readonly snackBar = inject(MatSnackBar);

  readonly busqueda = signal('');
  readonly estado = signal<'Publicada' | 'Cerrada' | ''>('');

  readonly publicaciones = signal<Oportunidad[]>([]);
  readonly cargando = signal(true);
  readonly error = signal<string | null>(null);

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

  constructor() {
    this.cargarPublicaciones();
  }

  async cargarPublicaciones(): Promise<void> {
    try {
      this.cargando.set(true);
      this.error.set(null);
      const oportunidades = await this.oportunidadesService.todas();
      this.publicaciones.set(
        oportunidades.filter((item) => item.estado === 'Publicada' || item.estado === 'Cerrada'),
      );
    } catch (error) {
      console.error('Error al cargar publicaciones:', error);

      this.error.set('No se pudieron cargar las publicaciones.');
    } finally {
      this.cargando.set(false);
    }
  }

  async alternarEstado(item: Oportunidad): Promise<void> {
    const nuevoEstado: 'Publicada' | 'Cerrada' =
      item.estado === 'Publicada' ? 'Cerrada' : 'Publicada';

    try {
      await this.oportunidadesService.cambiarEstado(item.id, nuevoEstado);

      this.publicaciones.update((items) =>
        items.map((publicacion) =>
          publicacion.id === item.id
            ? {
                ...publicacion,
                estado: nuevoEstado,
                fechaActualizacion: new Date().toISOString(),
              }
            : publicacion,
        ),
      );

      this.snackBar.open(
        nuevoEstado === 'Publicada' ? 'Oportunidad publicada nuevamente.' : 'Publicación cerrada.',
        'Cerrar',
        {
          duration: 2500,
        },
      );
    } catch (error) {
      console.error('Error al actualizar publicación:', error);

      this.snackBar.open('No se pudo actualizar la publicación.', 'Cerrar', {
        duration: 3000,
      });
    }
  }

  limpiarFiltros(): void {
    this.busqueda.set('');
    this.estado.set('');
  }

  formatearFecha(fecha: string): string {
    if (!fecha) {
      return 'Sin fecha';
    }

    return new Date(fecha).toLocaleDateString('es-BO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
}
