import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { Oportunidad } from '../../../../../domain/oportunidad';
import { Usuario } from '../../../../../domain/usuario';

import { OportunidadesService } from '../../../../../services/oportunidades';
import { UsuariosService } from '../../../../../services/usuarios';

interface ActividadAdmin {
  icono: string;
  titulo: string;
  detalle: string;
  fecha: string;
}

@Component({
  selector: 'admin-dashboard',
  templateUrl: './component.html',
  styleUrl: './component.css',
  imports: [RouterLink, MatButtonModule, MatCardModule, MatIconModule],
})
export class AdminDashboardComponent {
  private readonly oportunidadesService = inject(OportunidadesService);
  private readonly usuariosService = inject(UsuariosService);

  readonly pendientes = signal(0);
  readonly usuarios = signal(0);
  readonly publicacionesActivas = signal(0);
  readonly cerradas = signal(0);
  readonly actividad = signal<ActividadAdmin[]>([]);
  readonly cargando = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    this.cargarDashboard();
  }

  async cargarDashboard(): Promise<void> {
    try {
      this.cargando.set(true);
      this.error.set(null);

      const [oportunidades, usuarios] = await Promise.all([
        this.oportunidadesService.todas(),
        this.usuariosService.todos(),
      ]);

      this.actualizarEstadisticas(oportunidades, usuarios);
      this.cargarActividad(oportunidades);
    } catch (error) {
      console.error('Error al cargar dashboard administrativo:', error);
      this.error.set('No se pudo cargar la información del dashboard.');
    } finally {
      this.cargando.set(false);
    }
  }

  private actualizarEstadisticas(oportunidades: Oportunidad[], usuarios: Usuario[]): void {
    this.pendientes.set(oportunidades.filter((item) => item.estado === 'Pendiente').length);
    this.usuarios.set(usuarios.length);
    this.publicacionesActivas.set(
      oportunidades.filter((item) => item.estado === 'Publicada').length,
    );
    this.cerradas.set(oportunidades.filter((item) => item.estado === 'Cerrada').length);
  }

  private cargarActividad(oportunidades: Oportunidad[]): void {
    const recientes = [...oportunidades]
      .sort(
        (a, b) =>
          new Date(b.fechaActualizacion).getTime() - new Date(a.fechaActualizacion).getTime(),
      )
      .slice(0, 5);
    this.actividad.set(
      recientes.map((item) => ({
        icono: this.iconoEstado(item.estado),
        titulo: this.tituloEstado(item.estado),
        detalle: `${item.titulo} · ${item.organizacion}`,
        fecha: this.formatearFecha(item.fechaActualizacion || item.fechaCreacion),
      })),
    );
  }

  private iconoEstado(estado: Oportunidad['estado']): string {
    switch (estado) {
      case 'Pendiente':
        return 'pending_actions';
      case 'Publicada':
        return 'verified';
      case 'Rechazada':
        return 'cancel';
      case 'Cerrada':
        return 'archive';
    }
  }

  private tituloEstado(estado: Oportunidad['estado']): string {
    switch (estado) {
      case 'Pendiente':
        return 'Oportunidad pendiente';
      case 'Publicada':
        return 'Oportunidad publicada';
      case 'Rechazada':
        return 'Oportunidad rechazada';
      case 'Cerrada':
        return 'Oportunidad cerrada';
    }
  }

  private formatearFecha(fecha: string): string {
    if (!fecha) {
      return '';
    }

    return new Date(fecha).toLocaleDateString('es-BO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
}
