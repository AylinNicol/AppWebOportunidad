import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';

import { USUARIOS, Usuario } from '../../../../../data/usuarios.data';

@Component({
  selector: 'admin-usuarios',
  templateUrl: './component.html',
  styleUrl: './component.css',
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
  ],
})
export class AdminUsuariosComponent {
  readonly busqueda = signal('');
  readonly rol = signal<Usuario['rol'] | ''>('');
  readonly usuarios = signal<Usuario[]>([...USUARIOS]);
  paginaActual = 0;
  tamanoPagina = 5;
  readonly columnas = ['usuario', 'rol', 'registro', 'estado', 'accion'];

  readonly filtrados = computed(() => {
    const texto = this.busqueda().trim().toLowerCase();
    const rol = this.rol();
    return this.usuarios().filter((usuario) => {
      const coincideTexto =
        !texto ||
        usuario.nombre.toLowerCase().includes(texto) ||
        usuario.correo.toLowerCase().includes(texto);
      const coincideRol = !rol || usuario.rol === rol;
      return coincideTexto && coincideRol;
    });
  });

  readonly paginados = computed(() => {
    const inicio = this.paginaActual * this.tamanoPagina;

    return this.filtrados().slice(inicio, inicio + this.tamanoPagina);
  });

  constructor(private snackBar: MatSnackBar) {}
  cambiarEstado(id: string): void {
    let nuevoEstado: Usuario['estado'] = 'Activo';
    this.usuarios.update((usuarios) =>
      usuarios.map((usuario) => {
        if (usuario.id !== id) {
          return usuario;
        }
        nuevoEstado = usuario.estado === 'Activo' ? 'Bloqueado' : 'Activo';
        return {
          ...usuario,
          estado: nuevoEstado,
        };
      }),
    );
    this.snackBar.open(`Usuario ${nuevoEstado.toLowerCase()}.`, 'Cerrar', {
      duration: 2500,
    });
  }
  limpiarFiltros(): void {
    this.busqueda.set('');
    this.rol.set('');
    this.paginaActual = 0;
  }
  cambiarPagina(evento: PageEvent): void {
    this.paginaActual = evento.pageIndex;
    this.tamanoPagina = evento.pageSize;
  }
}
