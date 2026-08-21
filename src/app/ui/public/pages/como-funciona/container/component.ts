import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'como-funciona',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  imports: [MatStepperModule, MatButtonModule, MatIconModule],
})
export class ComoFuncionaPublicComponent {}
