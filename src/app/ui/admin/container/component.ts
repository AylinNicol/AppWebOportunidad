import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

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
  readonly menuAbierto = signal(false);
  readonly esMovil = signal(false);

  readonly adminUser = {
    nombre: 'Administrador',
    email: 'admin@oportunidades.bo',
  };

  private readonly breakpointSubscription: Subscription;

  constructor(breakpointObserver: BreakpointObserver) {
    this.breakpointSubscription = breakpointObserver
      .observe('(max-width: 1023px)')
      .subscribe((resultado) => {
        this.esMovil.set(resultado.matches);
        if (!resultado.matches) {
          this.menuAbierto.set(true);
        }
      });
  }

  toggleMenu(): void {
    this.menuAbierto.update((valor) => !valor);
  }

  cerrarMenu(): void {
    if (this.esMovil()) {
      this.menuAbierto.set(false);
    }
  }

  ngOnDestroy(): void {
    this.breakpointSubscription.unsubscribe();
  }
}
