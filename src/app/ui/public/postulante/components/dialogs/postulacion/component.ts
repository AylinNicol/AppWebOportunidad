import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { Oportunidad } from '../../../../../../domain/oportunidad';
import { AuthService } from '../../../../../../services/auth';

import { PostulacionesService } from '../../../../../../services/postulaciones';
import { Postulacion } from '../../../../../../domain/postulacion';

export interface PostulacionDialogData {
  oportunidad: Oportunidad;
}

@Component({
  selector: 'postulacion-dialog',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  imports: [
    FormsModule,

    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
})
export class PostulacionDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<PostulacionDialogComponent>);
  private readonly postulacionesService = inject(PostulacionesService);

  readonly authService = inject(AuthService);
  readonly data = inject<PostulacionDialogData>(MAT_DIALOG_DATA);
  readonly pasoActual = signal(1);

  nombre = '';
  telefono = '';
  carrera = '';
  cartaPresentacion = '';
  archivoCv: File | null = null;
  nombreArchivoCv = '';
  confirmacion = false;
  constructor() {
    const usuario = this.authService.usuario();
    if (usuario) {
      this.nombre = usuario.nombre ?? '';
      this.telefono = usuario.telefono ?? '';
      this.carrera = usuario.carrera ?? '';
    }
  }

  siguientePaso(): void {
    if (this.pasoActual() === 1) {
      if (!this.nombre.trim() || !this.telefono.trim() || !this.carrera.trim()) {
        return;
      }
    }
    if (this.pasoActual() === 2 && !this.archivoCv) {
      return;
    }
    if (this.pasoActual() < 3) {
      this.pasoActual.update((paso) => paso + 1);
    }
  }

  anteriorPaso(): void {
    if (this.pasoActual() > 1) {
      this.pasoActual.update((paso) => paso - 1);
    }
  }

  seleccionarCv(event: Event): void {
    const input = event.target as HTMLInputElement;
    const archivo = input.files?.[0];
    if (!archivo) {
      return;
    }
    if (archivo.type !== 'application/pdf') {
      alert('El CV debe estar en formato PDF.');
      input.value = '';
      return;
    }
    const maximo = 5 * 1024 * 1024;
    if (archivo.size > maximo) {
      alert('El CV no debe superar los 5 MB.');
      input.value = '';
      return;
    }
    this.archivoCv = archivo;
    this.nombreArchivoCv = archivo.name;
  }

  cerrar(): void {
    this.dialogRef.close();
  }

  async enviarPostulacion(): Promise<void> {
    if (!this.confirmacion) {
      return;
    }
    const usuario = this.authService.usuario();
    if (!usuario) {
      return;
    }
    if (!this.archivoCv) {
      return;
    }
    const ahora = new Date().toISOString();
    const postulacion: Omit<Postulacion, 'id'> = {
      slug: `${usuario.slug}-${this.data.oportunidad.slug}`,
      oportunidadId: this.data.oportunidad.id,
      oportunidadSlug: this.data.oportunidad.slug,
      usuarioId: usuario.id,
      usuarioSlug: usuario.slug,
      organizacionId: this.data.oportunidad.organizacionId,
      fechaPostulacion: ahora,
      estado: 'Enviada',
      nombrePostulante: this.nombre,
      correoPostulante: usuario.correo,
      telefono: this.telefono,
      carrera: this.carrera,
      cvUrl: this.archivoCv.name,
      ...(this.cartaPresentacion.trim()
        ? { cartaPresentacion: this.cartaPresentacion.trim() }
        : {}),
      historial: [
        {
          estado: 'Enviada',
          fecha: ahora,
          observacion: 'Postulación registrada correctamente.',
        },
      ],
      fechaActualizacion: ahora,
    };

    try {
      const id = await this.postulacionesService.crear(postulacion);
      console.log('Postulación creada:', id);
      alert('Postulación enviada.');
      this.dialogRef.close({
        creada: true,
        id,
      });
    } catch (error) {
      console.error('Error al crear la postulación:', error);
      if (
        error instanceof Error &&
        error.message === 'Ya existe una postulación para esta oportunidad.'
      ) {
        alert('Ya te postulaste a esta oportunidad.');
        return;
      }
      alert('No se pudo enviar la postulación.');
    }
  }
}
