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

import { Oportunidad } from '../../../../../../domain/oportunidad';
import { Organizacion } from '../../../../../../domain/organizacion';

import { AuthService } from '../../../../../../services/auth';
import { OrganizacionesService } from '../../../../../../services/organizaciones';
import { OportunidadesService } from '../../../../../../services/oportunidades';

@Component({
  selector: 'organizacion-oportunidades',
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
  ],
})
export class OrganizacionOportunidadesComponent {
  private readonly authService = inject(AuthService);
  private readonly organizacionesService = inject(OrganizacionesService);
  private readonly oportunidadesService = inject(OportunidadesService);

  readonly organizacion = signal<Organizacion | null>(null);
  readonly busqueda = signal('');
  readonly estado = signal('');
  readonly oportunidades = signal<Oportunidad[]>([]);

  readonly filtradas = computed(() => {
    const busqueda = this.busqueda().trim().toLowerCase();
    const estado = this.estado();

    return this.oportunidades().filter((item) => {
      const coincideBusqueda = !busqueda || item.titulo.toLowerCase().includes(busqueda);
      const coincideEstado = !estado || item.estado === estado;
      return coincideBusqueda && coincideEstado;
    });
  });

  constructor() {
    this.cargarOportunidades();
  }

  private async cargarOportunidades(): Promise<void> {
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
      const oportunidades = await this.oportunidadesService.porOrganizacion(organizacion.id);
      this.oportunidades.set(oportunidades);
    } catch (error) {
      console.error('Error al cargar oportunidades de la organización:', error);
    }
  }

  async cerrar(item: Oportunidad): Promise<void> {
    try {
      await this.oportunidadesService.cerrar(item.id);
      item.estado = 'Cerrada';
      this.oportunidades.set([...this.oportunidades()]);
    } catch (error) {
      console.error('Error al cerrar la oportunidad:', error);
    }
  }

  limpiar(): void {
    this.busqueda.set('');
    this.estado.set('');
  }
}
