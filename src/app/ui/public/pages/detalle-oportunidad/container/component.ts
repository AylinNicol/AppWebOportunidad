import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { OPORTUNIDADES, Oportunidad } from '../../oportunidades/container/oportunidades.data';

@Component({
  selector: 'oportunidad',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  imports: [
    RouterLink,

    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
  ],
})
export class DetalleOportunidadPublicComponent {
  private readonly route = inject(ActivatedRoute);

  get oportunidad(): Oportunidad | null {
    const slug = this.route.snapshot.paramMap.get('slug');

    return OPORTUNIDADES.find((opr) => opr.slug === slug) ?? null;
  }
}
