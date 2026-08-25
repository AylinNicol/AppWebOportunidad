import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { Organizacion } from '../../../../../../domain/organizacion';

import { AuthService } from '../../../../../../services/auth';
import { OrganizacionesService } from '../../../../../../services/organizaciones';

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
    MatSelectModule,
  ],
})
export class OrganizacionPerfilComponent {
  private readonly authService = inject(AuthService);
  private readonly organizacionesService = inject(OrganizacionesService);
  readonly editando = signal(false);
  readonly organizacion = signal<Organizacion | null>(null);
  readonly departamentos = [
    'Beni',
    'Chuquisaca',
    'Cochabamba',
    'La Paz',
    'Oruro',
    'Pando',
    'Potosí',
    'Santa Cruz',
    'Tarija',
  ];
  readonly categorias = [
    'Tecnología & Software',
    'Consultoría e Ingeniería',
    'ONG & Desarrollo Social',
    'Comunidad Educativa',
    'Diseño & Tecnología',
    'Diseño & Creatividad',
    'Educación & Tecnología',
    'Marketing & Comunicación',
    'Ciberseguridad',
    'Datos & Analítica',
    'Otra',
  ];
  nombre = '';
  categoria = '';
  ubicacion = '';
  correo = '';
  telefono = '';
  sitioWeb = '';
  descripcion = '';

  constructor() {
    this.cargarOrganizacion();
  }

  private async cargarOrganizacion(): Promise<void> {
    await this.authService.ready;
    const usuario = this.authService.usuario();
    if (!usuario) {
      return;
    }

    try {
      const organizacion = await this.organizacionesService.porUsuario(usuario.id);
      if (!organizacion) {
        console.error('No se encontró una organización asociada al usuario.');
        return;
      }
      this.organizacion.set(organizacion);
      this.nombre = organizacion.nombre;
      this.categoria = organizacion.categoria;
      this.ubicacion = this.normalizarDepartamento(organizacion.ubicacion);
      this.correo = organizacion.correo;
      this.telefono = organizacion.telefono ?? '';
      this.sitioWeb = organizacion.sitioWeb ?? '';
      this.descripcion = organizacion.descripcion;
    } catch (error) {
      console.error('Error al cargar perfil de organización:', error);
    }
  }

  async guardar(): Promise<void> {
    const organizacion = this.organizacion();

    if (!organizacion) {
      return;
    }

    try {
      await this.organizacionesService.actualizar(organizacion.id, {
        nombre: this.nombre.trim(),
        categoria: this.categoria,
        ubicacion: this.ubicacion,
        correo: this.correo.trim(),
        telefono: this.telefono.trim(),
        sitioWeb: this.sitioWeb.trim(),
        descripcion: this.descripcion.trim(),
      });

      const actualizada = await this.organizacionesService.porId(organizacion.id);

      if (actualizada) {
        this.organizacion.set(actualizada);
      }
      this.editando.set(false);
    } catch (error) {
      console.error('Error al guardar perfil de organización:', error);
    }
  }

  cancelarEdicion(): void {
    const organizacion = this.organizacion();
    if (!organizacion) {
      return;
    }
    this.nombre = organizacion.nombre;
    this.categoria = organizacion.categoria;
    this.ubicacion = this.normalizarDepartamento(organizacion.ubicacion);
    this.correo = organizacion.correo;
    this.telefono = organizacion.telefono ?? '';
    this.sitioWeb = organizacion.sitioWeb ?? '';
    this.descripcion = organizacion.descripcion;
    this.editando.set(false);
  }

  private normalizarDepartamento(ubicacion: string): string {
    const encontrada = this.departamentos.find((departamento) =>
      ubicacion.toLowerCase().includes(departamento.toLowerCase()),
    );
    return encontrada ?? ubicacion;
  }
}
