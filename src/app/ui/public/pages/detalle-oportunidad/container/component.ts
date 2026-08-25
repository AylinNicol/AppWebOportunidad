import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';

import { Oportunidad } from '../../../../../domain/oportunidad';
import { OportunidadesService } from '../../../../../services/oportunidades';

import { AuthService } from '../../../../../services/auth';
import { AuthDialogComponent } from '../../../auth/dialog/component';
import { PostulacionDialogComponent } from '../../../postulante/components/dialogs/postulacion/component';

@Component({
  selector: 'oportunidad',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  imports: [
    RouterLink,

    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
  ],
})
export class DetalleOportunidadPublicComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly dialog = inject(MatDialog);
  private readonly oportunidadesService = inject(OportunidadesService);

  readonly authService = inject(AuthService);
  readonly oportunidad = signal<Oportunidad | null>(null);

  constructor() {
    this.cargarOportunidad();
  }

  private async cargarOportunidad(): Promise<void> {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) {
      return;
    }
    try {
      const oportunidad = await this.oportunidadesService.porSlug(slug);
      this.oportunidad.set(oportunidad);
    } catch (error) {
      console.error('Error al cargar la oportunidad:', error);
    }
  }

  postular(): void {
    if (!this.authService.autenticado()) {
      this.dialog.open(AuthDialogComponent, {
        data: {
          modo: 'login',
        },
      });

      return;
    }
    if (this.authService.rol() !== 'Postulante') {
      return;
    }
    const oportunidad = this.oportunidad();
    if (!oportunidad) {
      return;
    }
    this.dialog.open(PostulacionDialogComponent, {
      data: {
        oportunidad,
      },
    });
  }
}
