import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../../../services/auth';

type AuthModo = 'login' | 'register';
type RolRegistro = 'postulante' | 'organizacion';

@Component({
  selector: 'auth-dialog',
  imports: [
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIcon,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
  ],
  templateUrl: './component.html',
  styleUrl: './component.css',
})
export class AuthDialogComponent {
  private readonly data = inject<{ modo: AuthModo }>(MAT_DIALOG_DATA);

  private readonly dialogRef = inject(MatDialogRef<AuthDialogComponent>);

  private readonly authService = inject(AuthService);

  // Login / registro
  readonly modo = signal<AuthModo>(this.data.modo);

  // Rol seleccionado durante el registro público
  readonly rolRegistro = signal<RolRegistro>('postulante');

  // Datos del formulario
  readonly nombre = signal('');
  readonly nombre_org = signal('');
  readonly correo = signal('');
  readonly contrasena = signal('');

  // Estado de la petición
  readonly cargando = signal(false);
  readonly error = signal<string | null>(null);

  // Contraseña visible o no
  readonly hide = signal(true);

  setModo(modo: AuthModo): void {
    this.modo.set(modo);
    this.error.set(null);
  }

  setRolRegistro(rol: RolRegistro): void {
    this.rolRegistro.set(rol);
  }

  clickEvent(event: MouseEvent): void {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  async submit(): Promise<void> {
    this.error.set(null);

    const correo = this.correo().trim();
    const contrasena = this.contrasena();
    const nombre = this.nombre().trim();
    const nombreOrganizacion = this.nombre_org().trim();

    if (!correo || !contrasena) {
      this.error.set('Ingresa tu correo y contraseña.');
      return;
    }

    if (this.modo() === 'register') {
      if (!nombre) {
        this.error.set(
          this.rolRegistro() === 'postulante'
            ? 'Ingresa tu nombre completo.'
            : 'Ingresa el nombre del representante.',
        );
        return;
      }
      if (this.rolRegistro() === 'organizacion' && !nombreOrganizacion) {
        this.error.set('Ingresa el nombre de la organización.');
        return;
      }
    }

    try {
      this.cargando.set(true);
      if (this.modo() === 'login') {
        await this.authService.loginCorreo(correo, contrasena);
      } else {
        await this.authService.registrarCorreo(
          nombre,
          correo,
          contrasena,
          this.rolRegistro() === 'postulante' ? 'Postulante' : 'Organización',
          this.rolRegistro() === 'organizacion' ? nombreOrganizacion : undefined,
        );
      }
      this.dialogRef.close(true);
    } catch (error) {
      console.error('Error de autenticación:', error);
      this.error.set(this.obtenerMensajeError(error));
    } finally {
      this.cargando.set(false);
    }
  }

  async loginGoogle(): Promise<void> {
    this.error.set(null);
    const nombreOrganizacion = this.nombre_org().trim();
    if (
      this.modo() === 'register' &&
      this.rolRegistro() === 'organizacion' &&
      !nombreOrganizacion
    ) {
      this.error.set('Ingresa el nombre de la organización.');
      return;
    }

    try {
      this.cargando.set(true);
      await this.authService.loginGoogle(
        this.rolRegistro() === 'postulante' ? 'Postulante' : 'Organización',
        this.rolRegistro() === 'organizacion' ? nombreOrganizacion : undefined,
      );
      this.dialogRef.close(true);
    } catch (error) {
      console.error('Error con Google:', error);
      this.error.set(this.obtenerMensajeError(error));
    } finally {
      this.cargando.set(false);
    }
  }

  private obtenerMensajeError(error: unknown): string {
    if (typeof error === 'object' && error !== null && 'code' in error) {
      const code = String(error.code);
      switch (code) {
        case 'auth/invalid-credential':
          return 'Correo o contraseña incorrectos.';
        case 'auth/email-already-in-use':
          return 'Ya existe una cuenta con este correo.';
        case 'auth/invalid-email':
          return 'El correo electrónico no es válido.';
        case 'auth/weak-password':
          return 'La contraseña debe tener al menos 6 caracteres.';
        case 'auth/popup-closed-by-user':
          return 'Se cerró el inicio de sesión con Google.';
        case 'auth/popup-blocked':
          return 'El navegador bloqueó la ventana de Google.';
      }
    }

    return 'Ocurrió un error. Inténtalo nuevamente.';
  }
}
