import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { SeguimientoDialogComponent } from '../../../components/dialogs/seguimiento/component';

import { Postulacion } from '../../../../../../domain/postulacion';
import { Oportunidad } from '../../../../../../domain/oportunidad';

import { AuthService } from '../../../../../../services/auth';
import { PostulacionesService } from '../../../../../../services/postulaciones';
import { OportunidadesService } from '../../../../../../services/oportunidades';

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
    DatePipe,
  ],
})
export class PostulantePostulacionesComponent {
  private readonly dialog = inject(MatDialog);
  private readonly authService = inject(AuthService);
  private readonly postulacionesService = inject(PostulacionesService);
  private readonly oportunidadesService = inject(OportunidadesService);

  readonly busqueda = signal('');
  readonly estado = signal<Postulacion['estado'] | ''>('');

  readonly postulaciones = signal<Postulacion[]>([]);
  readonly oportunidades = signal<Oportunidad[]>([]);

  constructor() {
    this.cargarDatos();
  }

  private async cargarDatos(): Promise<void> {
    await this.authService.ready;
    const usuario = this.authService.usuario();
    if (!usuario) {
      return;
    }
    try {
      const [postulaciones, oportunidades] = await Promise.all([
        this.postulacionesService.porPostulante(usuario.id),
        this.oportunidadesService.todas(),
      ]);
      this.postulaciones.set(postulaciones);
      this.oportunidades.set(oportunidades);
    } catch (error) {
      console.error('Error al cargar mis postulaciones:', error);
    }
  }

  readonly filtradas = computed(() => {
    const busqueda = this.busqueda().trim().toLowerCase();
    const estado = this.estado();
    return this.postulaciones()
      .slice()
      .sort(
        (a, b) => new Date(b.fechaPostulacion).getTime() - new Date(a.fechaPostulacion).getTime(),
      )
      .map((item) => {
        const oportunidad = this.oportunidades().find(
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

  verSeguimiento(item: any): void {
    this.dialog.open(SeguimientoDialogComponent, {
      data: {
        postulacion: item,
        tituloOportunidad: item.oportunidad?.titulo,
        organizacion: item.oportunidad?.organizacion,
      },
    });
  }

  obtenerOportunidad(postulacion: Postulacion): Oportunidad | undefined {
    return this.oportunidades().find((oportunidad) => oportunidad.id === postulacion.oportunidadId);
  }
  limpiar(): void {
    this.busqueda.set('');
    this.estado.set('');
  }
}
