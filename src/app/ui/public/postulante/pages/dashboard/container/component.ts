import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { POSTULACIONES, Postulacion } from '../../../../../../data/postulaciones.data';
import { USUARIOS, Usuario } from '../../../../../../data/usuarios.data';
import { OPORTUNIDADES, Oportunidad } from '../../../../../../data/oportunidades.data';

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
  ],
})
export class PostulanteDashboardComponent {
  readonly perfil: Usuario = USUARIOS.find((usuario) => usuario.id === 'usr-001')!;
  readonly postulaciones = signal<Postulacion[]>(
    POSTULACIONES.filter((postulacion) => postulacion.usuarioId === this.perfil.id),
  );
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
    const campos = [this.perfil.nombre, this.perfil.correo];

    const completados = campos.filter((campo) => campo && campo.toString().trim() !== '').length;

    return Math.round((completados / campos.length) * 100);
  });
  readonly recientes = computed(() =>
    this.postulaciones()
      .slice(0, 3)
      .map((postulacion) => {
        const oportunidad = OPORTUNIDADES.find((item) => item.id === postulacion.oportunidadId);
        return {
          ...postulacion,
          oportunidad,
        };
      }),
  );
}
