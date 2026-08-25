import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { EstadoPostulacion, Postulacion } from '../../../../../../domain/postulacion';

import { Oportunidad } from '../../../../../../domain/oportunidad';
import { Organizacion } from '../../../../../../domain/organizacion';

import { AuthService } from '../../../../../../services/auth';
import { OrganizacionesService } from '../../../../../../services/organizaciones';
import { PostulacionesService } from '../../../../../../services/postulaciones';
import { OportunidadesService } from '../../../../../../services/oportunidades';

interface PostulanteVista {
  id: string;
  oportunidadId: string;
  oportunidad: string;
  nombre: string;
  correo: string;
  fecha: string;
  estado: EstadoPostulacion;
}

@Component({
  selector: 'organizacion-postulantes',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
  ],
})
export class OrganizacionPostulantesComponent {
  private readonly authService = inject(AuthService);
  private readonly organizacionesService = inject(OrganizacionesService);
  private readonly postulacionesService = inject(PostulacionesService);
  private readonly oportunidadesService = inject(OportunidadesService);

  readonly organizacion = signal<Organizacion | null>(null);
  readonly estado = signal<EstadoPostulacion | ''>('');
  readonly postulantes = signal<PostulanteVista[]>([]);
  readonly filtrados = computed(() =>
    this.postulantes().filter((item) => !this.estado() || item.estado === this.estado()),
  );

  constructor() {
    this.cargarPostulantes();
  }

  private async cargarPostulantes(): Promise<void> {
    await this.authService.ready;
    const usuario = this.authService.usuario();
    if (!usuario) {
      return;
    }
    try {
      const organizacion = await this.organizacionesService.porUsuario(usuario.id);
      if (!organizacion) {
        console.error('No se encontró una organización asociada al usuario.');

        return;
      }
      this.organizacion.set(organizacion);
      const [postulaciones, oportunidades] = await Promise.all([
        this.postulacionesService.porOrganizacion(organizacion.id),
        this.oportunidadesService.porOrganizacion(organizacion.id),
      ]);
      const vista = postulaciones.map((postulacion) => {
        const oportunidad = oportunidades.find((item) => item.id === postulacion.oportunidadId);

        return this.crearVista(postulacion, oportunidad);
      });
      this.postulantes.set(vista);
    } catch (error) {
      console.error('Error al cargar postulantes:', error);
    }
  }

  private crearVista(postulacion: Postulacion, oportunidad?: Oportunidad): PostulanteVista {
    return {
      id: postulacion.id,
      oportunidadId: postulacion.oportunidadId,
      oportunidad: oportunidad?.titulo ?? 'Oportunidad',
      nombre: postulacion.nombrePostulante,
      correo: postulacion.correoPostulante,
      fecha: postulacion.fechaPostulacion,
      estado: postulacion.estado,
    };
  }

  async actualizarEstado(item: PostulanteVista, estado: EstadoPostulacion): Promise<void> {
    try {
      await this.postulacionesService.cambiarEstado(
        item.id,
        estado,
        `Estado actualizado por la organización a "${estado}".`,
      );
      item.estado = estado;
      this.postulantes.set([...this.postulantes()]);
    } catch (error) {
      console.error('Error al actualizar estado de la postulación:', error);
    }
  }
}
