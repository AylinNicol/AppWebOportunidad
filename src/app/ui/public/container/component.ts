import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/component';
import { FooterComponent } from '../components/footer/component';

@Component({
  selector: 'public',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  host: {
    class: 'min-h-screen bg-slate-50 text-slate-800 flex flex-col',
  },
})
export class PublicComponent {}
