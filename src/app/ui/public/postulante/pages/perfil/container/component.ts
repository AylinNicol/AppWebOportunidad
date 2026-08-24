import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { USUARIOS, Usuario } from '../../../../../../data/usuarios.data';

@Component({
  selector: 'postulante-perfil',
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
export class PostulantePerfilComponent {
  readonly editando = signal(false);

  readonly perfil: Usuario = USUARIOS.find((usuario) => usuario.id === 'usr-001')!;

  nombre = this.perfil.nombre;
  correo = this.perfil.correo;
  telefono = this.perfil.telefono ?? '';
  carrera = this.perfil.carrera ?? '';
  ubicacion = this.perfil.ubicacion ?? '';
  universidad = this.perfil.universidad ?? '';
  fechaEgreso = this.perfil.fechaEgreso ?? '';
  cvUrl = this.perfil.cvUrl ?? '';

  cvNombre = this.perfil.cvUrl?.split('/').pop() ?? 'Sin CV cargado';

  guardar(): void {
    this.editando.set(false);
  }

  seleccionarCv(event: Event): void {
    const input = event.target as HTMLInputElement;
    const archivo = input.files?.[0];

    if (archivo) {
      this.cvNombre = archivo.name;
    }
  }
}
