import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  LucideBriefcase,
  LucideLogOut,
  LucideMenu,
  LucideX,
  LucideLogIn,
  LucideUserPlus,
} from '@lucide/angular';

@Component({
  selector: 'public',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  imports: [
    RouterOutlet,
    LucideBriefcase,
    LucideLogOut,
    LucideMenu,
    LucideX,
    LucideLogIn,
    LucideUserPlus,
  ],
  host: {
    class: 'min-h-screen bg-slate-50 text-slate-800 flex flex-col',
  },
})
export class PublicComponent {}
