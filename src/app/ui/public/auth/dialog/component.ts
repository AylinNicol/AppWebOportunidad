import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

type AuthModo = 'login' | 'register';
type RolRegistro = 'postulante' | 'organizacion';

@Component({
  selector: 'auth-dialog',
  imports: [
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
  readonly modo = signal<AuthModo>(this.data.modo);
  setModo(modo: AuthModo): void {
    this.modo.set(modo);
  }

  readonly rolRegistro = signal<RolRegistro>('postulante');
  setRolRegistro(rol: RolRegistro): void {
    this.rolRegistro.set(rol);
  }

  //Contraseña visible o no
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
