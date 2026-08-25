import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { Usuario } from '../../../../../../domain/usuario';
import { AuthService } from '../../../../../../services/auth';
import { UsuariosService } from '../../../../../../services/usuarios';

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
  private readonly authService = inject(AuthService);
  private readonly usuariosService = inject(UsuariosService);

  readonly editando = signal(false);
  readonly perfil = signal<Usuario | null>(null);

  nombre = '';
  correo = '';
  telefono = '';
  carrera = '';
  ubicacion = '';
  universidad = '';
  fechaEgreso = '';
  cvUrl = '';
  cvNombre = 'Sin CV cargado';

  constructor() {
    this.cargarPerfil();
  }
  private async cargarPerfil(): Promise<void> {
    await this.authService.ready;
    const usuario = this.authService.usuario();
    if (!usuario) {
      return;
    }
    this.perfil.set(usuario);
    this.nombre = usuario.nombre;
    this.correo = usuario.correo;
    this.telefono = usuario.telefono ?? '';
    this.carrera = usuario.carrera ?? '';
    this.ubicacion = usuario.ubicacion ?? '';
    this.universidad = usuario.universidad ?? '';
    this.fechaEgreso = usuario.fechaEgreso ?? '';
    this.cvUrl = usuario.cvUrl ?? '';
    this.cvNombre = usuario.cvUrl?.split('/').pop() ?? 'Sin CV cargado';
  }

  async guardar(): Promise<void> {
    const usuario = this.perfil();
    if (!usuario) {
      return;
    }
    try {
      await this.usuariosService.actualizar(usuario.id, {
        nombre: this.nombre.trim(),
        telefono: this.telefono.trim(),
        carrera: this.carrera.trim(),
        ubicacion: this.ubicacion.trim(),
        universidad: this.universidad.trim(),
        fechaEgreso: this.fechaEgreso.trim(),
      });
      const perfilActualizado = await this.authService.recargarPerfil();
      if (perfilActualizado) {
        this.perfil.set(perfilActualizado);
      }
      this.editando.set(false);
    } catch (error) {
      console.error('Error al guardar perfil:', error);
    }
  }

  async seleccionarCv(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const archivo = input.files?.[0];

    if (!archivo) {
      return;
    }
    if (archivo.type !== 'application/pdf') {
      console.error('El CV debe ser un archivo PDF.');
      input.value = '';
      return;
    }
    const usuario = this.perfil();
    if (!usuario) {
      return;
    }
    try {
      await this.usuariosService.actualizar(usuario.id, {
        cvUrl: archivo.name,
      });
      this.cvUrl = archivo.name;
      this.cvNombre = archivo.name;
      const perfilActualizado = await this.authService.recargarPerfil();
      if (perfilActualizado) {
        this.perfil.set(perfilActualizado);
      }
      console.log('CV registrado correctamente:', archivo.name);
    } catch (error) {
      console.error('Error al registrar CV:', error);
    } finally {
      input.value = '';
    }
  }
}
