import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { Oportunidad } from '../../../../../domain/oportunidad';
import { OportunidadesService } from '../../../../../services/oportunidades';

import { AuthDialogComponent } from '../../../auth/dialog/component';

@Component({
  selector: 'inicio',
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
export class InicioPublicComponent {
  private readonly oportunidadesService = inject(OportunidadesService);

  readonly oportunidades = signal<Oportunidad[]>([]);
  busqueda = '';
  categoria = '';
  modalidad = '';

  constructor(
    private router: Router,
    private dialog: MatDialog,
  ) {
    this.cargarOportunidades();
  }
  private async cargarOportunidades(): Promise<void> {
    try {
      const oportunidades = await this.oportunidadesService.publicadas();

      this.oportunidades.set(
        oportunidades
          .slice()
          .sort((a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime())
          .slice(0, 3),
      );
    } catch (error) {
      console.error('Error al cargar oportunidades destacadas:', error);
    }
  }

  buscar(): void {
    const queryParams: Record<string, string> = {};

    if (this.busqueda.trim()) {
      queryParams['busqueda'] = this.busqueda.trim();
    }

    if (this.categoria) {
      queryParams['categoria'] = this.categoria;
    }

    if (this.modalidad) {
      queryParams['modalidad'] = this.modalidad;
    }

    this.router.navigate(['/oportunidades'], {
      queryParams,
    });
  }

  openAuth(modo: 'login' | 'register'): void {
    this.dialog.open(AuthDialogComponent, {
      data: { modo },
    });
  }
}
