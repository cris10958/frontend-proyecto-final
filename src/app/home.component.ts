import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavBarComponent } from './nav-bar.component';
import { FooterComponent } from './footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavBarComponent, FooterComponent],
  template: `
   <div class="container-fluid p-0 brand-hover">
      <app-nav-bar></app-nav-bar>
    </div>
    <div id="id-base" class="container-fluit">
    </div>
    <div id="id-img" class="cuerpo ps-5 pe-5 pt-3 h-75">
      <img src="./assets/img/Pagina Principal.png" width="100%" alt="imagen_inicial">
    </div>
    <app-footer></app-footer>
      `,
  styles: [`
    .cuerpo{
      background-color:transparent;
      max-height: 69vh;
      overflow: auto;
    }
  `]
})
export class HomeComponent {

}
