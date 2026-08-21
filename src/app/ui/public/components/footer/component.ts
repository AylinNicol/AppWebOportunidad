import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'footer-public',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  imports: [RouterLink, MatIcon],
})
export class FooterComponent {}
