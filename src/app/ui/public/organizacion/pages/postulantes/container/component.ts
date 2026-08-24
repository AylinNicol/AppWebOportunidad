import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { OPORTUNIDADES } from '../../../../../../data/oportunidades.data';
import { ORGANIZACIONES } from '../../../../../../data/organizaciones.data';
import { POSTULACIONES } from '../../../../../../data/postulaciones.data';

type EstadoPostulante = 'Enviada' | 'En revisión' | 'Entrevista' | 'Seleccionada' | 'Rechazada';

interface PostulanteVista {
  id: string;
  oportunidadId: string;
  oportunidad: string;
  nombre: string;
  email: string;
  fecha: string;
  estado: EstadoPostulante;
}

@Component({
  selector: 'organizacion-postulantes',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
  ],
})
export class OrganizacionPostulantesComponent {
  readonly organizacion = ORGANIZACIONES[0];

  private readonly idsOportunidades = new Set(
    OPORTUNIDADES.filter(
      (item) =>
        item.organizacionId === this.organizacion.id ||
        item.organizacion === this.organizacion.nombre,
    ).map((item) => item.id),
  );

  readonly estado = signal<EstadoPostulante | ''>('');

  readonly postulantes = signal<PostulanteVista[]>(
    (POSTULACIONES as unknown as Record<string, unknown>[])
      .map((item, index) => this.normalizar(item, index))
      .filter((item) => !item.oportunidadId || this.idsOportunidades.has(item.oportunidadId)),
  );

  readonly filtrados = computed(() =>
    this.postulantes().filter((item) => !this.estado() || item.estado === this.estado()),
  );

  actualizarEstado(item: PostulanteVista, estado: EstadoPostulante): void {
    item.estado = estado;
    this.postulantes.set([...this.postulantes()]);
  }

  private normalizar(item: Record<string, unknown>, index: number): PostulanteVista {
    const oportunidadId = String(
      item['oportunidadId'] ?? item['jobId'] ?? item['idOportunidad'] ?? '',
    );

    const oportunidad = OPORTUNIDADES.find((opp) => opp.id === oportunidadId);

    return {
      id: String(item['id'] ?? `post-${index + 1}`),
      oportunidadId,
      oportunidad: String(
        item['tituloOportunidad'] ?? item['oportunidad'] ?? oportunidad?.titulo ?? 'Oportunidad',
      ),
      nombre: String(
        item['nombrePostulante'] ?? item['postulante'] ?? item['nombre'] ?? 'Postulante',
      ),
      email: String(item['emailPostulante'] ?? item['email'] ?? 'Sin correo registrado'),
      fecha: String(item['fechaPostulacion'] ?? item['fecha'] ?? 'Sin fecha'),
      estado: this.estadoSeguro(item['estado']),
    };
  }

  private estadoSeguro(valor: unknown): EstadoPostulante {
    const permitidos: EstadoPostulante[] = [
      'Enviada',
      'En revisión',
      'Entrevista',
      'Seleccionada',
      'Rechazada',
    ];

    return permitidos.includes(valor as EstadoPostulante) ? (valor as EstadoPostulante) : 'Enviada';
  }
}
