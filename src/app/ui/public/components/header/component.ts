import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialogComponent } from '../../auth/dialog/component';

@Component({
  selector: 'header-public',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  imports: [
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIcon,
    MatMenuModule,
    MatDividerModule,
  ],
})
export class HeaderComponent {
  private readonly dialog = inject(MatDialog);
  abrirLogin(): void {
    this.dialog.open(AuthDialogComponent, {
      data: {
        modo: 'login',
      },
    });
  }
  abrirRegistrate(): void {
    this.dialog.open(AuthDialogComponent, {
      data: {
        modo: 'register',
      },
    });
  }
}
