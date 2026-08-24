import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { ORGANIZACIONES, Organizacion } from '../../../../../../data/organizaciones.data';

@Component({
  selector: 'organizacion-perfil',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
})
export class OrganizacionPerfilComponent {
  readonly editando = signal(false);
  readonly organizacion: Organizacion = ORGANIZACIONES[0];

  nombre = this.organizacion.nombre;
  categoria = this.organizacion.categoria;
  ubicacion = this.organizacion.ubicacion;
  email = this.organizacion.correo;
  descripcion = this.organizacion.descripcion;

  guardar(): void {
    this.editando.set(false);
  }
}
