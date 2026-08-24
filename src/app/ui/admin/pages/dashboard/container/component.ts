import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { OPORTUNIDADES } from '../../../../../data/oportunidades.data';
import { USUARIOS } from '../../../../../data/usuarios.data';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './component.html',
  styleUrl: './component.css',
  imports: [RouterLink, MatButtonModule, MatCardModule, MatIconModule],
})
export class AdminDashboardComponent {
  readonly pendientes = OPORTUNIDADES.filter((item) => item.estado === 'Pendiente').length;

  readonly usuarios = USUARIOS.length;

  readonly publicacionesActivas = OPORTUNIDADES.filter((item) => item.estado === 'Publicada')
    .length;

  readonly cerradas = OPORTUNIDADES.filter((item) => item.estado === 'Cerrada').length;

  readonly actividad = [
    {
      icono: 'pending_actions',
      titulo: 'Nueva oportunidad pendiente',
      detalle: 'Pasantía en Ciencia de Datos · TechBolivia Community',
      fecha: 'Hoy',
    },
    {
      icono: 'person_add',
      titulo: 'Nuevo usuario registrado',
      detalle: 'María Flores · Estudiante',
      fecha: 'Hoy',
    },
    {
      icono: 'verified',
      titulo: 'Oportunidad publicada',
      detalle: 'Desarrollador Web Junior · Empresa ABC',
      fecha: 'Ayer',
    },
  ];
}
