import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DatePipe } from '@angular/common';

import { Postulacion } from '../../../../../../domain/postulacion';
import { Usuario } from '../../../../../../domain/usuario';
import { Oportunidad } from '../../../../../../domain/oportunidad';

import { AuthService } from '../../../../../../services/auth';
import { PostulacionesService } from '../../../../../../services/postulaciones';
import { OportunidadesService } from '../../../../../../services/oportunidades';

@Component({
  selector: 'postulante-dashboard',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatProgressBarModule,
    DatePipe,
  ],
})
export class PostulanteDashboardComponent {
  private readonly authService = inject(AuthService);
  private readonly postulacionesService = inject(PostulacionesService);
  private readonly oportunidadesService = inject(OportunidadesService);

  readonly perfil = signal<Usuario | null>(null);
  readonly postulaciones = signal<Postulacion[]>([]);
  readonly oportunidades = signal<Oportunidad[]>([]);

  constructor() {
    this.cargarDashboard();
  }

  private async cargarDashboard(): Promise<void> {
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
      this.perfil.set(usuario);
      this.postulaciones.set(postulaciones);
      this.oportunidades.set(oportunidades);
    } catch (error) {
      console.error('Error al cargar dashboard del postulante:', error);
    }
  }

  readonly total = computed(() => this.postulaciones().length);
  readonly enProceso = computed(
    () =>
      this.postulaciones().filter((item) =>
        ['Enviada', 'En revisión', 'Entrevista'].includes(item.estado),
      ).length,
  );
  readonly seleccionadas = computed(
    () => this.postulaciones().filter((item) => item.estado === 'Seleccionada').length,
  );

  readonly perfilCompleto = computed(() => {
    const perfil = this.perfil();
    if (!perfil) {
      return 0;
    }
    const campos = [
      perfil.nombre,
      perfil.correo,
      perfil.telefono,
      perfil.ubicacion,
      perfil.carrera,
      perfil.universidad,
      perfil.fechaEgreso,
      perfil.cvUrl,
    ];
    const completados = campos.filter((campo) => campo && campo.toString().trim() !== '').length;
    return Math.round((completados / campos.length) * 100);
  });

  readonly recientes = computed(() =>
    this.postulaciones()
      .slice()
      .sort(
        (a, b) => new Date(b.fechaPostulacion).getTime() - new Date(a.fechaPostulacion).getTime(),
      )
      .slice(0, 3)
      .map((postulacion) => {
        const oportunidad = this.oportunidades().find(
          (item) => item.id === postulacion.oportunidadId,
        );
        return {
          ...postulacion,
          oportunidad,
        };
      }),
  );
}
