import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  template: `
    <div class="container-fluid p-0 brand-hover">
      <app-nav-bar></app-nav-bar>
    </div>
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'sport-app';
}
