import { Component } from '@angular/core';
import { NavUsuarioComponent } from './nav-usuario.component';
import { FooterComponent } from './footer.component';
import { MenuComponent } from './menu.component';

@Component({
  selector: 'app-panel-usuario',
  standalone: true,
  imports: [NavUsuarioComponent, FooterComponent, MenuComponent],
  template: `
    <div class="container-fluid p-0 brand-hover">
      <app-nav-usuario></app-nav-usuario>
    </div>
    <div id="id-base" class="container-fluit"></div>
    <div id="contenido-panel" class="cuerpo pt-3 h-75" style="overflow: auto; max-height:75vh;">
      <app-menu></app-menu>
    </div>
    <app-footer></app-footer>
  `,
  styles: [`
  .cuerpo{
    background-color:transparent;
  }
`],
})
export class PanelUsuarioComponent {}
