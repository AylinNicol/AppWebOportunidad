import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { AuthService } from '../../../../../services/auth';

@Component({
  selector: 'postulante-menu',
  templateUrl: './component.html',
  imports: [RouterLink, MatButtonModule, MatIconModule, MatMenuModule],
})
export class PostulanteMenuComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  async cerrarSesion(): Promise<void> {
    await this.authService.cerrarSesion();
    await this.router.navigateByUrl('/');
  }
}
