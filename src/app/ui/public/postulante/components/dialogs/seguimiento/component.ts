import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { EstadoPostulacion, Postulacion } from '../../../../../../domain/postulacion';

export interface SeguimientoDialogData {
  postulacion: Postulacion;
  tituloOportunidad?: string;
  organizacion?: string;
}

@Component({
  selector: 'seguimiento-dialog',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  imports: [DatePipe, MatButtonModule, MatIconModule],
})
export class SeguimientoDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<SeguimientoDialogComponent>);

  readonly data = inject<SeguimientoDialogData>(MAT_DIALOG_DATA);

  readonly estados: EstadoPostulacion[] = ['Enviada', 'En revisión', 'Entrevista', 'Seleccionada'];

  cerrar(): void {
    this.dialogRef.close();
  }

  eventoPorEstado(estado: EstadoPostulacion) {
    return this.data.postulacion.historial.find((evento) => evento.estado === estado);
  }

  estadoAlcanzado(estado: EstadoPostulacion): boolean {
    return this.data.postulacion.historial.some((evento) => evento.estado === estado);
  }

  esRechazada(): boolean {
    return this.data.postulacion.estado === 'Rechazada';
  }
}
