import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { OPORTUNIDADES, Oportunidad } from '../../../../../../data/oportunidades.data';

import { ORGANIZACIONES } from '../../../../../../data/organizaciones.data';

@Component({
  selector: 'publicar-oportunidad',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
  ],
})
export class PublicarOportunidadComponent {
  readonly organizacion = ORGANIZACIONES[0];

  titulo = '';
  tipo = '';
  categoria = '';
  modalidad = '';
  ubicacion = this.organizacion.ubicacion;
  fechaLimite = '';
  descripcion = '';

  constructor(public router: Router) {}

  publicar(): void {
    if (
      !this.titulo.trim() ||
      !this.tipo ||
      !this.categoria ||
      !this.modalidad ||
      !this.descripcion.trim()
    ) {
      return;
    }

    const slug = this.titulo
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const nuevaOportunidad = {
      id: `opp-${Date.now()}`,
      slug,
      titulo: this.titulo.trim(),
      organizacion: this.organizacion.nombre,
      organizacionId: this.organizacion.id,
      logo: '',
      ubicacion: this.ubicacion,
      modalidad: this.modalidad,
      tipo: this.tipo,
      categoria: this.categoria,
      fechaLimite: this.fechaLimite,
      descripcion: this.descripcion.trim(),
      requisitos: [],
      beneficios: [],
      fechaPublicacion: 'Hoy',
      estado: 'Pendiente',
    } as unknown as Oportunidad;

    OPORTUNIDADES.unshift(nuevaOportunidad);

    this.router.navigate(['/mis-oportunidades']);
  }
}
