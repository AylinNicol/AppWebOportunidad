import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Organizaciones, Organizacion } from '../../organizaciones/container/organizaciones.data';

@Component({
  selector: 'organizacion',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  imports: [
    RouterLink,

    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatTooltipModule,
  ],
})
export class PerfilOrganizacionPublicComponent {
  private readonly route = inject(ActivatedRoute);

  get organizacion(): Organizacion | null {
    const slug = this.route.snapshot.paramMap.get('slug');

    return Organizaciones.find((org) => org.slug === slug) ?? null;
  }
}
