import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'public',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  imports: [RouterOutlet],
})
export class PublicComponent {}
