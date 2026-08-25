import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
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

import { Usuario } from '../../../../../domain/usuario';
import { UsuariosService } from '../../../../../services/usuarios';

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
    DatePipe,
  ],
})
export class AdminUsuariosComponent implements OnInit {
  private readonly usuariosService = inject(UsuariosService);
  private readonly snackBar = inject(MatSnackBar);

  readonly busqueda = signal('');
  readonly rol = signal<Usuario['rol'] | ''>('');

  readonly usuarios = signal<Usuario[]>([]);
  readonly cargando = signal(true);
  readonly error = signal<string | null>(null);

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

  async ngOnInit(): Promise<void> {
    await this.cargarUsuarios();
  }

  async cargarUsuarios(): Promise<void> {
    try {
      this.cargando.set(true);
      this.error.set(null);

      const usuarios = await this.usuariosService.todos();

      this.usuarios.set(usuarios);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      this.error.set('No se pudieron cargar los usuarios.');
    } finally {
      this.cargando.set(false);
    }
  }

  async cambiarEstado(usuario: Usuario): Promise<void> {
    const nuevoEstado: Usuario['estado'] = usuario.estado === 'Activo' ? 'Bloqueado' : 'Activo';

    try {
      await this.usuariosService.cambiarEstado(usuario.id, nuevoEstado);

      this.usuarios.update((usuarios) =>
        usuarios.map((item) =>
          item.id === usuario.id
            ? {
                ...item,
                estado: nuevoEstado,
              }
            : item,
        ),
      );

      this.snackBar.open(`Usuario ${nuevoEstado.toLowerCase()}.`, 'Cerrar', {
        duration: 2500,
      });
    } catch (error) {
      console.error('Error al cambiar estado:', error);

      this.snackBar.open('No se pudo actualizar el usuario.', 'Cerrar', {
        duration: 3000,
      });
    }
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
