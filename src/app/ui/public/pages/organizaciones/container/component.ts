import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Organizaciones, Organizacion } from './organizaciones.data';

@Component({
  selector: 'organizaciones',
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
    MatTooltipModule,
  ],
})
export class OrganizacionesPublicComponent {
  search = '';

  readonly organizaciones: Organizacion[] = Organizaciones;

  get filtradoOrganizaciones(): Organizacion[] {
    const value = this.search.toLowerCase().trim();

    if (!value) {
      return this.organizaciones;
    }

    return this.organizaciones.filter(
      (org) =>
        org.nombre.toLowerCase().includes(value) ||
        org.categoria.toLowerCase().includes(value) ||
        org.Ubicacion.toLowerCase().includes(value),
    );
  }
}
