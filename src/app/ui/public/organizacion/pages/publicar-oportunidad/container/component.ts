import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { Oportunidad } from '../../../../../../domain/oportunidad';
import { Organizacion } from '../../../../../../domain/organizacion';

import { AuthService } from '../../../../../../services/auth';
import { OrganizacionesService } from '../../../../../../services/organizaciones';
import { OportunidadesService } from '../../../../../../services/oportunidades';

@Component({
  selector: 'publicar-oportunidad',
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
export class PublicarOportunidadComponent {
  private readonly authService = inject(AuthService);
  private readonly organizacionesService = inject(OrganizacionesService);
  private readonly oportunidadesService = inject(OportunidadesService);

  readonly organizacion = signal<Organizacion | null>(null);
  readonly guardando = signal(false);
  readonly tipos = ['Pasantía', 'Empleo Junior', 'Beca', 'Voluntariado'];
  readonly modalidades = ['Presencial', 'Remoto', 'Híbrido'];
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
    'Desarrollo Web',
    'Desarrollo de Software',
    'Tecnología',
    'Soporte TI',
    'Redes y Telecomunicaciones',
    'Ciberseguridad',
    'Datos y Analítica',
    'Inteligencia Artificial',
    'Diseño UI/UX',
    'Diseño Gráfico',
    'Marketing',
    'Comunicación',
    'Administración',
    'Contabilidad y Finanzas',
    'Recursos Humanos',
    'Ingeniería',
    'Educación',
    'Capacitación',
    'Investigación',
    'Salud',
    'Medio Ambiente',
    'Desarrollo Social',
    'ONG',
    'Ventas y Comercial',
    'Logística',
    'Legal',
    'Otra',
  ];

  titulo = '';
  tipo = '';
  categoria = '';
  modalidad = '';
  ubicacion = '';
  fechaLimite = '';
  descripcion = '';

  cantidadVacantes = 1;
  salario = '';

  requisitosTexto = '';
  responsabilidadesTexto = '';
  beneficiosTexto = '';

  constructor(public readonly router: Router) {
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
      this.ubicacion = organizacion.ubicacion;
    } catch (error) {
      console.error('Error al cargar la organización:', error);
    }
  }

  async publicar(): Promise<void> {
    const organizacion = this.organizacion();

    if (!organizacion) {
      return;
    }

    if (
      !this.titulo.trim() ||
      !this.tipo ||
      !this.categoria ||
      !this.modalidad ||
      !this.ubicacion.trim() ||
      !this.fechaLimite ||
      !this.descripcion.trim() ||
      this.cantidadVacantes < 1 ||
      this.convertirLista(this.requisitosTexto).length === 0 ||
      this.convertirLista(this.responsabilidadesTexto).length === 0
    ) {
      return;
    }

    const ahora = new Date().toISOString();

    const nuevaOportunidad: Omit<Oportunidad, 'id'> = {
      slug: this.generarSlug(this.titulo),

      titulo: this.titulo.trim(),
      organizacion: organizacion.nombre,
      organizacionId: organizacion.id,
      logo: organizacion.logo ?? '',
      ubicacion: this.ubicacion.trim(),
      modalidad: this.modalidad,
      tipo: this.tipo,
      categoria: this.categoria,
      fechaLimite: this.fechaLimite,
      descripcion: this.descripcion.trim(),
      // Todavía no está publicada.
      fechaPublicacion: '',
      estado: 'Pendiente',
      beneficios: this.convertirLista(this.beneficiosTexto),
      destacada: false,
      cantidadVacantes: this.cantidadVacantes,

      ...(this.salario.trim() ? { salario: this.salario.trim() } : {}),

      fechaCreacion: ahora,
      fechaActualizacion: ahora,
      requisitos: this.convertirLista(this.requisitosTexto),
      responsabilidades: this.convertirLista(this.responsabilidadesTexto),
    };

    try {
      this.guardando.set(true);
      await this.oportunidadesService.crear(nuevaOportunidad);
      await this.router.navigate(['/organizacion/mis-oportunidades']);
    } catch (error) {
      console.error('Error al publicar oportunidad:', error);
    } finally {
      this.guardando.set(false);
    }
  }

  cancelar(): void {
    this.router.navigate(['/organizacion/mis-oportunidades']);
  }

  private convertirLista(valor: string): string[] {
    return valor
      .split('\n')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  private generarSlug(valor: string): string {
    return valor
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
}
