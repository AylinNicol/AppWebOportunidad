import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'acerca-de',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  imports: [MatCardModule, MatChipsModule],
})
export class AcercaDePublicComponent {}
