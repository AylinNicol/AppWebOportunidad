import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'organizacion-menu',
  templateUrl: './component.html',
  imports: [RouterLink, MatButtonModule, MatIconModule, MatMenuModule],
})
export class OrganizacionMenuComponent {
  cerrarSesion(): void {
    // Temporal.
    // Al conectar Firebase Auth, aquí se llamará al servicio de autenticación.
  }
}
