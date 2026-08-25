import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

import { Oportunidad } from '../../../../../../domain/oportunidad';
import { Organizacion } from '../../../../../../domain/organizacion';

import { AuthService } from '../../../../../../services/auth';
import { OrganizacionesService } from '../../../../../../services/organizaciones';
import { OportunidadesService } from '../../../../../../services/oportunidades';
import { PostulacionesService } from '../../../../../../services/postulaciones';

@Component({
  selector: 'organizacion-dashboard',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  imports: [RouterLink, MatButtonModule, MatCardModule, MatChipsModule, MatIconModule],
})
export class OrganizacionDashboardComponent {
  private readonly authService = inject(AuthService);
  private readonly organizacionesService = inject(OrganizacionesService);
  private readonly oportunidadesService = inject(OportunidadesService);
  private readonly postulacionesService = inject(PostulacionesService);

  readonly organizacion = signal<Organizacion | null>(null);
  readonly oportunidades = signal<Oportunidad[]>([]);
  readonly totalPostulaciones = signal(0);
  readonly total = computed(() => this.oportunidades().length);
  readonly publicadas = computed(
    () => this.oportunidades().filter((item) => item.estado === 'Publicada').length,
  );
  readonly pendientes = computed(
    () => this.oportunidades().filter((item) => item.estado === 'Pendiente').length,
  );
  readonly cerradas = computed(
    () => this.oportunidades().filter((item) => item.estado === 'Cerrada').length,
  );

  readonly recientes = computed(() =>
    this.oportunidades()
      .slice()
      .sort((a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime())
      .slice(0, 3),
  );

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
      const organizacion = await this.organizacionesService.porUsuario(usuario.id);
      if (!organizacion) {
        console.error('No se encontró una organización asociada al usuario.');
        return;
      }
      this.organizacion.set(organizacion);
      const [oportunidades, postulaciones] = await Promise.all([
        this.oportunidadesService.porOrganizacion(organizacion.id),
        this.postulacionesService.porOrganizacion(organizacion.id),
      ]);
      this.oportunidades.set(oportunidades);
      this.totalPostulaciones.set(postulaciones.length);
    } catch (error) {
      console.error('Error al cargar dashboard de organización:', error);
    }
  }
}
