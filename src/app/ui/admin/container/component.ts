import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, ViewChild, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AuthService } from '../../../services/auth';

@Component({
  selector: 'admin-container',
  templateUrl: './component.html',
  styleUrl: './component.css',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
  ],
})
export class AdminComponent implements OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  @ViewChild('sidenav') sidenav!: MatSidenav;

  readonly menuAbierto = signal(false);
  readonly esMovil = signal(false);

  readonly adminUser = this.authService.usuario;

  private readonly breakpointSubscription: Subscription;

  constructor(breakpointObserver: BreakpointObserver) {
    this.breakpointSubscription = breakpointObserver
      .observe('(max-width: 1023px)')
      .subscribe((resultado) => {
        this.esMovil.set(resultado.matches);

        if (!resultado.matches) {
          this.menuAbierto.set(true);
        } else {
          this.menuAbierto.set(false);
        }
      });
  }
  async toggleMenu(): Promise<void> {
    if (this.esMovil()) {
      await this.sidenav.toggle();
      return;
    }

    this.menuAbierto.update((valor) => !valor);
  }
  async cerrarMenu(): Promise<void> {
    if (this.esMovil()) {
      await this.sidenav.close();
      this.menuAbierto.set(false);
    }
  }
  async ocultarMenu(): Promise<void> {
    if (this.esMovil()) {
      await this.sidenav.close();
    } else {
      this.menuAbierto.set(false);
    }
  }
  async cerrarSesion(): Promise<void> {
    await this.authService.cerrarSesion();
    await this.router.navigateByUrl('/');
  }
  ngOnDestroy(): void {
    this.breakpointSubscription.unsubscribe();
  }
}
