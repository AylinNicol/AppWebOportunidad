import { Component } from '@angular/core';
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

import { OPORTUNIDADES, Oportunidad } from '../../../../../data/oportunidades.data';

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
  busqueda = '';
  categoria = '';
  modalidad = '';

  oportunidades: Oportunidad[] = OPORTUNIDADES.filter(
    (oportunidad) => oportunidad.estado === 'Publicada',
  ).slice(0, 3);

  constructor(
    private router: Router,
    private dialog: MatDialog,
  ) {}

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
